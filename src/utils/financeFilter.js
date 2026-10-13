// Scopes every Finance section to the selected academic year, branch and period.
// All money derives from data/financeData.json:
// - branch rows ground branch views (share of collections/expenses, exact row figures)
// - academicYears[].factor scales past years
// - periods[] define the chart slice, the stats end-month and the transaction months.

export const inr = (n) => `₹${Math.round(Number(n) || 0).toLocaleString('en-IN')}`

const lakh = (n) => `₹${(Number(n) / 100000).toFixed(1)}L`

export function getFilteredFinance(data, { academicYearLabel, branchLabel, periodLabel }) {
  const year = data.academicYears.find((y) => y.label === academicYearLabel) || data.academicYears[0]
  const period = data.periods.find((p) => p.label === periodLabel) || data.periods[0]
  const allRows = data.branchSummary.branches

  const isAll = !branchLabel || branchLabel.startsWith('All')
  const branchRow = isAll ? null : allRows.find((b) => b.name === branchLabel)

  const totalCollected = allRows.reduce((s, b) => s + b.feesCollected, 0)
  const totalExpenses = allRows.reduce((s, b) => s + b.expenses, 0)
  const totalOutstanding = allRows.reduce((s, b) => s + b.outstanding, 0)

  const fy = year.factor
  const collectionShare = branchRow ? branchRow.feesCollected / totalCollected : 1
  const expenseShare = branchRow ? branchRow.expenses / totalExpenses : 1
  const scaleCollections = (v) => v * fy * collectionShare
  const scaleExpenses = (v) => v * fy * expenseShare

  const monthly = data.collectionsOverview.monthly
  const end = Math.min(period.statsEnd, monthly.length - 1)
  const endPoint = monthly[end]

  // Collections = cumulative curve value at window end; expenses = monthly rate.
  // (Cumulative is always >= one month of expenses, so net stays positive.)
  const collections = scaleCollections(endPoint.feeCollections)
  const otherIncome = scaleCollections(endPoint.otherIncome)
  const expenses = scaleExpenses(data.expenseBreakdown.total)
  const outstanding = (branchRow ? branchRow.outstanding : 875000) * fy
  const net = collections - expenses
  const dueStudents = Math.max(
    1,
    Math.round(data.outstandingStudents * (branchRow ? branchRow.outstanding / totalOutstanding : 1))
  )

  const scope = isAll ? 'Across all branches' : branchRow ? branchRow.name : branchLabel
  const expensePct = collections > 0 ? ((expenses / collections) * 100).toFixed(1) : '0.0'

  const stats = data.stats.map((stat) => {
    switch (stat.id) {
      case 'total-collections':
        return { ...stat, value: inr(collections), subtitle: `${scope} • Up to ${period.shortLabel}` }
      case 'outstanding-fees':
        return {
          ...stat,
          value: inr(outstanding),
          badge: `${dueStudents} Student${dueStudents === 1 ? '' : 's'}`,
        }
      case 'total-expenses':
        return {
          ...stat,
          value: inr(expenses),
          subtitle: period.filterMonths.length === 1 ? 'Current month' : 'Monthly average',
          badge: `${expensePct}% of collections`,
        }
      case 'net-balance':
        return { ...stat, value: inr(net) }
      default:
        return stat
    }
  })

  // Collections chart: slice the cumulative curve, scale, refresh legend totals.
  // Quarterly always shows the full-year quarters (scaled) — it is the coarse view.
  const [cs, ce] = period.chartSlice
  const sliced = monthly.slice(cs, ce + 1).map((m) => ({
    month: m.month,
    feeCollections: Math.round(scaleCollections(m.feeCollections)),
    otherIncome: Math.round(scaleCollections(m.otherIncome)),
  }))
  const lastSlice = sliced[sliced.length - 1] || { feeCollections: 0, otherIncome: 0 }
  const collectionsChart = {
    title: data.collectionsOverview.title,
    subtitle: `${data.collectionsOverview.subtitle} • ${scope}`,
    legend: [
      { label: `Fee Collections (${lakh(lastSlice.feeCollections)})`, color: '#7c3aed' },
      { label: `Other Income (${lakh(lastSlice.otherIncome)})`, color: '#3b82f6' },
    ],
    monthly: sliced,
    quarterly: data.collectionsOverview.quarterly.map((q) => ({
      month: q.month,
      feeCollections: Math.round(scaleCollections(q.feeCollections)),
      otherIncome: Math.round(scaleCollections(q.otherIncome)),
    })),
  }

  const expenseCats = data.expenseBreakdown.categories.map((c) => ({
    ...c,
    amount: Math.round(scaleExpenses(c.amount)),
  }))
  const expenseData = {
    ...data.expenseBreakdown,
    total: expenseCats.reduce((s, c) => s + c.amount, 0),
    totalLabel: lakh(expenseCats.reduce((s, c) => s + c.amount, 0)),
    monthlyCap: Math.round(data.expenseBreakdown.monthlyCap * expenseShare * fy),
    monthlyCapLabel: inr(data.expenseBreakdown.monthlyCap * expenseShare * fy),
    categories: expenseCats,
  }

  const branchRows = (branchRow ? [branchRow] : allRows).map((b) => ({
    ...b,
    feesExpected: Math.round(b.feesExpected * fy),
    feesCollected: Math.round(b.feesCollected * fy),
    outstanding: Math.round(b.outstanding * fy),
    expenses: Math.round(b.expenses * fy),
    netBalance: Math.round(b.netBalance * fy),
  }))

  const transactions = data.recentCollections.items
    .filter(
      (t) =>
        (isAll || !branchRow || t.branch === branchRow.name) &&
        period.filterMonths.includes(t.month)
    )
    .map((t) => ({ ...t, amount: Math.round(t.amount * fy) }))

  const overdue = (outstanding * 520) / 875
  const dueWeek = (outstanding * 355) / 875
  const outstandingData = {
    ...data.outstandingSnapshot,
    totalDueLabel: `Total Due: ${inr(outstanding)}`,
    cards: [
      { ...data.outstandingSnapshot.cards[0], value: inr(overdue) },
      { ...data.outstandingSnapshot.cards[1], value: inr(dueWeek) },
    ],
    auditLog: data.outstandingSnapshot.auditLog.filter(
      (e) => !e.branch || isAll || !branchRow || e.branch === branchRow.name
    ),
    remindLabel: `Send Fee Reminders (${dueStudents} Student${dueStudents === 1 ? '' : 's'})`,
  }

  return {
    year,
    period,
    isAll,
    branchName: branchRow ? branchRow.name : null,
    stats,
    collections: collectionsChart,
    expenses: expenseData,
    branchTable: { ...data.branchSummary, branches: branchRows },
    recent: { ...data.recentCollections, items: transactions },
    outstanding: outstandingData,
    otherIncome,
  }
}
