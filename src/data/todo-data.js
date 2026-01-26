/**
 * Todo Kanban Board Data
 * Centralized data for the kanban board tasks
 */

export const todoData = {
    project: {
        name: 'Craftboard Project',
        icon: 'C',
        team: [
            { initials: 'AL', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
            { initials: '', bgColor: 'bg-emerald-500', textColor: 'text-white', isIcon: true },
            { initials: 'DT', bgColor: 'bg-blue-500', textColor: 'text-white' },
            { initials: '', bgColor: 'bg-orange-400', textColor: 'text-white', isIcon: true }
        ]
    },
    columns: [
        {
            id: 'todo',
            title: 'To-do',
            color: 'gray',
            colorShade: '400',
            tasks: [
                {
                    id: 1,
                    title: 'Employee Details',
                    description: 'Create a page where there is infor...',
                    projectLabel: 'Dashboard',
                    projectType: 'dashboard',
                    priority: 'medium',
                    assignees: [
                        { initials: 'A', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
                        { initials: 'D', bgColor: 'bg-rose-500', textColor: 'text-white' }
                    ],
                    attachments: 3,
                    comments: 12
                },
                {
                    id: 2,
                    title: 'Darkmode version',
                    description: 'Darkmode version for all screens',
                    projectLabel: 'Mobile app',
                    projectType: 'mobile',
                    priority: 'low',
                    assignees: [
                        { initials: 'A', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
                        { initials: 'DT', bgColor: 'bg-blue-500', textColor: 'text-white' }
                    ],
                    attachments: 2,
                    comments: 10
                },
                {
                    id: 3,
                    title: 'Super Admin Role',
                    description: 'Set up with relevant information s...',
                    projectLabel: 'Dashboard',
                    projectType: 'dashboard',
                    priority: 'medium',
                    assignees: [
                        { initials: 'A', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
                        { initials: 'D', bgColor: 'bg-rose-500', textColor: 'text-white' }
                    ],
                    attachments: 1,
                    comments: 5
                }
            ]
        },
        {
            id: 'progress',
            title: 'On Progress',
            color: 'blue',
            colorShade: '500',
            tasks: [
                {
                    id: 4,
                    title: 'Super Admin Role',
                    description: 'Set up with relevant information...',
                    projectLabel: 'Dashboard',
                    projectType: 'dashboard',
                    priority: 'high',
                    assignees: [
                        { initials: 'DT', bgColor: 'bg-blue-500', textColor: 'text-white' }
                    ],
                    attachments: 2,
                    comments: 8
                },
                {
                    id: 5,
                    title: 'Settings page',
                    description: 'Create settings configuration...',
                    projectLabel: 'Mobile app',
                    projectType: 'mobile',
                    priority: 'medium',
                    assignees: [
                        { initials: '', bgColor: 'bg-emerald-500', textColor: 'text-white', isIcon: true },
                        { initials: '', bgColor: 'bg-orange-400', textColor: 'text-white', isIcon: true }
                    ],
                    attachments: 1,
                    comments: 45
                },
                {
                    id: 6,
                    title: 'KPI and Employee Statisti...',
                    description: 'Create a design that displays KPIs...',
                    projectLabel: 'Dashboard',
                    projectType: 'dashboard',
                    priority: 'medium',
                    assignees: [
                        { initials: 'DT', bgColor: 'bg-blue-500', textColor: 'text-white' }
                    ],
                    attachments: 3,
                    comments: 3
                }
            ]
        },
        {
            id: 'review',
            title: 'In Review',
            color: 'amber',
            colorShade: '500',
            tasks: [
                {
                    id: 7,
                    title: 'Customer Role',
                    description: 'Set up with relevant information...',
                    projectLabel: 'Dashboard',
                    projectType: 'dashboard',
                    priority: 'medium',
                    assignees: [
                        { initials: 'A', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
                        { initials: 'DT', bgColor: 'bg-blue-500', textColor: 'text-white' }
                    ],
                    attachments: 2,
                    comments: 10
                },
                {
                    id: 8,
                    title: 'Admin Role',
                    description: 'set up with relevant information s...',
                    projectLabel: 'Dashboard',
                    projectType: 'dashboard',
                    priority: 'high',
                    assignees: [
                        { initials: 'A', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
                        { initials: 'D', bgColor: 'bg-rose-500', textColor: 'text-white' }
                    ],
                    attachments: 3,
                    comments: 12
                }
            ]
        },
        {
            id: 'completed',
            title: 'Completed',
            color: 'emerald',
            colorShade: '500',
            tasks: [
                {
                    id: 9,
                    title: 'Design system & Style gu...',
                    description: 'Set up with relevant information...',
                    projectLabel: 'Mobile app',
                    projectType: 'mobile',
                    priority: 'low',
                    assignees: [
                        { initials: 'A', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
                        { initials: 'D', bgColor: 'bg-rose-500', textColor: 'text-white' },
                        { initials: '', bgColor: 'bg-emerald-500', textColor: 'text-white', isIcon: true }
                    ],
                    attachments: 3,
                    comments: 12
                },
                {
                    id: 10,
                    title: 'Component & Color style',
                    description: 'set up with relevant information s...',
                    projectLabel: 'Dashboard',
                    projectType: 'dashboard',
                    priority: 'medium',
                    assignees: [
                        { initials: 'DT', bgColor: 'bg-blue-500', textColor: 'text-white' }
                    ],
                    attachments: 3,
                    comments: 3
                },
                {
                    id: 11,
                    title: 'Moodboarding and List s...',
                    description: 'set up with relevant information s...',
                    projectLabel: 'Dashboard',
                    projectType: 'dashboard',
                    priority: 'high',
                    assignees: [
                        { initials: '', bgColor: 'bg-emerald-500', textColor: 'text-white', isIcon: true },
                        { initials: '', bgColor: 'bg-orange-400', textColor: 'text-white', isIcon: true }
                    ],
                    attachments: 1,
                    comments: 45
                }
            ]
        }
    ]
};
