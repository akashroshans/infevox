// Builds a fully dynamic course-detail object from the clicked course row
// + the template in data/courseDetailData.json. No hardcoded course values
// live in components — everything comes from JSON via this resolver.

const formatFee = (fee) => `₹${Number(fee || 0).toLocaleString('en-IN')}`

// Deterministic pseudo-random from course id so counts are stable per course
function hashId(id = '') {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) % 100000
  }
  return h
}

function splitModules(total) {
  const base = Math.floor(total / 3)
  const rem = total % 3
  return [
    base + (rem > 0 ? 1 : 0),
    base + (rem > 1 ? 1 : 0),
    base,
  ]
}

const TRACK_COLORS = [
  { numberColor: 'bg-primary-500', modulesColor: 'bg-primary-50 text-primary-600' },
  { numberColor: 'bg-info', modulesColor: 'bg-blue-50 text-blue-600' },
  { numberColor: 'bg-success', modulesColor: 'bg-green-50 text-green-600' },
]

function buildTracks(course, template) {
  // Keep the authored Full Stack breakdown untouched
  if (course.id === template.courseId && template.curriculum?.tracks) {
    return template.curriculum.tracks
  }
  const total = Number(course.modules) || 0
  const parts = splitModules(total)
  const phases = ['Foundations & Basics', 'Core Concepts & Practice', 'Advanced Topics & Deployment']
  return parts.map((count, i) => ({
    id: `${course.id}-track-${i + 1}`,
    number: i + 1,
    numberColor: TRACK_COLORS[i].numberColor,
    title: `${course.name} — ${phases[i]}`,
    modulesLabel: `${count} Module${count === 1 ? '' : 's'}`,
    modulesColor: TRACK_COLORS[i].modulesColor,
    description: course.description || `${course.name} curriculum phase ${i + 1}.`,
    tags: [course.category, `${course.durationMonths} Months`, `${count} Modules`].filter(Boolean),
  }))
}

export function buildCourseDetail(course, template) {
  if (!course) return null
  const h = hashId(course.id)
  const enrolled = 40 + (h % 300)
  const instructors = 2 + (h % 3)
  const tas = h % 2
  const staff = instructors + tas
  const weeks = (Number(course.durationMonths) || 0) * 4
  const modules = Number(course.modules) || 0
  const approved = Math.max(0, modules - 2)
  const inProgress = modules - approved
  const growth = 4 + (h % 14)

  return {
    courseId: course.id,
    breadcrumb: ['Courses', course.name],
    title: course.name,
    subtitle:
      template.subtitle ||
      'Manage course information, modules, enrolled students and assigned staff across your institute.',
    status: course.status,
    publication: course.publication,
    stats: [
      {
        id: 'enrolled-students',
        label: 'Enrolled Students',
        value: String(enrolled),
        subtitle: 'Active learners',
        badge: `+${growth}%`,
        badgeColor: 'text-success',
        badgeBg: 'bg-green-50',
        icon: 'Users',
        bgColor: 'bg-primary-100',
        iconColor: 'text-primary-500',
      },
      {
        id: 'course-modules',
        label: 'Course Modules',
        value: String(modules),
        subtitle: `${approved} Approved • ${inProgress} in Progress`,
        badge: modules >= 10 ? 'Full Track' : 'Track',
        badgeColor: 'text-primary-500',
        badgeBg: 'bg-primary-50',
        icon: 'BookOpen',
        bgColor: 'bg-primary-100',
        iconColor: 'text-primary-500',
      },
      {
        id: 'assigned-staff',
        label: 'Assigned Staff',
        value: String(staff),
        subtitle: `${instructors} Instructors • ${tas} TA${tas === 1 ? '' : 's'}`,
        badge: 'Faculty',
        badgeColor: 'text-info',
        badgeBg: 'bg-blue-50',
        icon: 'UserCheck',
        bgColor: 'bg-blue-100',
        iconColor: 'text-info',
      },
      {
        id: 'course-duration',
        label: 'Course Duration',
        value: `${course.durationMonths} Month${Number(course.durationMonths) === 1 ? '' : 's'}`,
        subtitle: 'Full Schedule',
        badge: `${weeks} Weeks`,
        badgeColor: 'text-warning',
        badgeBg: 'bg-amber-50',
        icon: 'Clock',
        bgColor: 'bg-amber-100',
        iconColor: 'text-warning',
      },
    ],
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'modules', label: 'Modules', count: modules },
      { id: 'students', label: 'Students', count: enrolled },
      { id: 'staff', label: 'Staff', count: staff },
    ],
    information: {
      title: template.information?.title || 'Course Information',
      subtitle: template.information?.subtitle || 'Primary course specification and parameters',
      actionLabel: template.information?.actionLabel || 'Edit Information',
      fields: [
        { id: 'title', label: 'Course Title', value: course.name, type: 'text' },
        { id: 'category', label: 'Category', value: course.category, type: 'pill', pillColor: 'bg-primary-50 text-primary-600' },
        { id: 'duration', label: 'Duration', value: `${course.durationMonths} Months (${weeks} Weeks)`, type: 'text' },
        { id: 'fee', label: 'Course Fee', value: formatFee(course.fee), type: 'textStrong' },
        { id: 'status', label: 'Status', value: course.status, type: 'dot', dotColor: course.status === 'Active' ? 'bg-success' : course.status === 'Upcoming' ? 'bg-warning' : 'bg-danger' },
        { id: 'publication', label: 'Publication', value: course.publication === 'Published' ? 'Published & Enrolling' : course.publication, type: 'dot', dotColor: course.publication === 'Published' ? 'bg-info' : 'bg-text-muted' },
        { id: 'level', label: 'Target Level', value: course.level || 'Beginner to Advanced', type: 'text' },
        { id: 'certification', label: 'Certification', value: course.certification || 'Issued on Completion', type: 'dot', dotColor: 'bg-warning' },
      ],
    },
    curriculum: {
      title: template.curriculum?.title || 'Academic Structure & Curriculum Breakdown',
      subtitle: template.curriculum?.subtitle || 'High-level architectural milestones',
      badge: '3 Tracks',
      tracks: buildTracks(course, template),
    },
    activity: {
      title: template.activity?.title || 'Recent Course Activity',
      subtitle: template.activity?.subtitle || 'Audit log of course updates & milestones',
      items: [
        {
          id: 1,
          title: `${course.name} — Module ${String(Math.min(8, modules)).padStart(2, '0')} updated`,
          description: `Syllabus revised for the ${course.category} track • recently`,
          color: 'bg-primary-500',
        },
        {
          id: 2,
          title: 'New student batch enrolled',
          description: `${Math.min(35, enrolled)} students added to ${course.name} • recently`,
          color: 'bg-success',
        },
        {
          id: 3,
          title: 'Course publication status reviewed',
          description: `${course.publication} • ${course.status} • fee ${formatFee(course.fee)}`,
          color: 'bg-info',
        },
      ],
    },
  }
}
