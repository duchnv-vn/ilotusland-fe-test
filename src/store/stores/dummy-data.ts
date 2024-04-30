export const dummyProject = {
  _id: 0,
  name: 'Viet An Services',
  logoUrl:
    'https://vietan-enviro.com/wp-content/uploads/2023/11/logo-vae-final.svg',
  stages: [
    {
      id: 0,
      name: 'Screening & Assign',
      order: 1,
    },
    {
      id: 1,
      name: 'Planning & BoM',
      order: 2,
    },
    {
      id: 2,
      name: 'Planning Approval',
      order: 3,
    },
    {
      id: 3,
      name: 'Implementation & Report',
      order: 4,
    },
    {
      id: 4,
      name: 'Asking for Close',
      order: 5,
    },
  ],
  requestTypes: [
    {
      id: 0,
      name: 'Maintainance',
    },
    {
      id: 1,
      name: 'Repairation',
    },
    {
      id: 2,
      name: 'Installation',
    },
    {
      id: 3,
      name: 'Solution Consulting',
    },
  ],
};

export const dummyCompany = {
  _id: 0,
  name: 'Cong ty TNHH AAA',
  address: '123 Xa Lo Ha Noi, Tp. Thu Duc, Tp.HCM',
};

export const dummyCustomer = {
  _id: 0,
  name: 'Khach hang AAA',
  phoneNumber: '0794111222',
};

export const dummyAssignee0 = {
  _id: 0,
  name: 'Huynh Nguyen Viet Duc',
  email: 'huynhnguyenvietduc@gmail.com',
  avatarUrl: 'https://i.pravatar.cc/300',
};

export const dummyAssignee1 = {
  _id: 1,
  name: 'Masanori',
  email: 'noritechhub@gmail.com',
  avatarUrl: 'https://i.pravatar.cc/300',
};

export const dummyProjectMembers = [dummyAssignee0, dummyAssignee1];

export const dummyTicketsByBoard = [
  {
    _id: 0,
    title: '[AAA] Ticket 111',
    assignee: dummyAssignee0,
    reporter: dummyAssignee1,
    customer: dummyCustomer,
    company: dummyCompany,
    stageId: 0,
    description:
      'Dear Service Team,\nHiện tại dữ liệu....\nTeam trao đổi cho mình phương án triển khai.',
    requestTypeId: 0,
    priority: 1,
    timeTracking: 3,
    dueDate: new Date('2024-04-29').getTime(),
    attachedFiles: [
      {
        name: '202005 - Hiện trạng sự cố dữ liệu tại Hưng Yên',
        type: 'pdf',
        url: 'https://storage.cloud.google.com/ilotusland-test/%5BiLotusLand%5D%20B%E1%BA%A3ng%20m%C3%B4%20t%E1%BA%A3%20vai%20tr%C3%B2%2C%20tr%C3%A1ch%20nhi%E1%BB%87m%20c%E1%BB%A7a%20Senior%20Full%20Stack%20Developer.pdf',
        size: '32KB',
      },
    ],
    createdUser: dummyAssignee0,
    createdAt: '2024-04-27T00:00:00.000Z',
    updatedAt: '2024-04-29T06:00:00.000Z',
  },
  {
    _id: 1,
    title: '[AAA] Ticket 222',
    assignee: dummyAssignee0,
    reporter: dummyAssignee1,
    customer: dummyCustomer,
    company: dummyCompany,
    stageId: 0,
    description:
      'Dear Service Team,\nHiện tại dữ liệu....\nTeam trao đổi cho mình phương án triển khai.',
    requestTypeId: 1,
    priority: 2,
    timeTracking: 10,
    dueDate: new Date('2024-05-29').getTime(),
    attachedFiles: [
      {
        name: '202005 - Hiện trạng sự cố dữ liệu tại Hưng Yên',
        type: 'pdf',
        url: 'https://storage.cloud.google.com/ilotusland-test/%5BiLotusLand%5D%20B%E1%BA%A3ng%20m%C3%B4%20t%E1%BA%A3%20vai%20tr%C3%B2%2C%20tr%C3%A1ch%20nhi%E1%BB%87m%20c%E1%BB%A7a%20Senior%20Full%20Stack%20Developer.pdf',
        size: '32KB',
      },
    ],
    createdUser: dummyAssignee0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 2,
    title: '[AAA] Ticket 333',
    assignee: dummyAssignee1,
    reporter: dummyAssignee0,
    customer: dummyCustomer,
    company: dummyCompany,
    stageId: 4,
    description:
      'Dear Service Team,\nHiện tại dữ liệu....\nTeam trao đổi cho mình phương án triển khai.',
    requestTypeId: 2,
    priority: 0,
    timeTracking: 5,
    dueDate: new Date('2024-05-01').getTime(),
    attachedFiles: [
      {
        name: '202005 - Hiện trạng sự cố dữ liệu tại Hưng Yên',
        type: 'pdf',
        url: 'https://storage.cloud.google.com/ilotusland-test/%5BiLotusLand%5D%20B%E1%BA%A3ng%20m%C3%B4%20t%E1%BA%A3%20vai%20tr%C3%B2%2C%20tr%C3%A1ch%20nhi%E1%BB%87m%20c%E1%BB%A7a%20Senior%20Full%20Stack%20Developer.pdf',
        size: '32KB',
      },
    ],
    createdUser: dummyAssignee1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 3,
    title: '[BBB] Ticket 444',
    assignee: dummyAssignee1,
    reporter: dummyAssignee0,
    customer: dummyCustomer,
    company: dummyCompany,
    stageId: 1,
    description:
      'Dear Service Team,\nHiện tại dữ liệu....\nTeam trao đổi cho mình phương án triển khai.',
    requestTypeId: 3,
    priority: 1,
    timeTracking: 0,
    dueDate: new Date('2024-09-29').getTime(),
    attachedFiles: [
      {
        name: '202005 - Hiện trạng sự cố dữ liệu tại Hưng Yên',
        type: 'pdf',
        url: 'https://storage.cloud.google.com/ilotusland-test/%5BiLotusLand%5D%20B%E1%BA%A3ng%20m%C3%B4%20t%E1%BA%A3%20vai%20tr%C3%B2%2C%20tr%C3%A1ch%20nhi%E1%BB%87m%20c%E1%BB%A7a%20Senior%20Full%20Stack%20Developer.pdf',
        size: '32KB',
      },
    ],
    createdUser: dummyAssignee0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 4,
    title: '[BBB] Ticket 555',
    assignee: dummyAssignee1,
    reporter: dummyAssignee0,
    customer: dummyCustomer,
    company: dummyCompany,
    stageId: 3,
    description:
      'Dear Service Team,\nHiện tại dữ liệu....\nTeam trao đổi cho mình phương án triển khai.',
    requestTypeId: 0,
    priority: 2,
    timeTracking: 16,
    dueDate: new Date('2024-03-30').getTime(),
    attachedFiles: [
      {
        name: '202005 - Hiện trạng sự cố dữ liệu tại Hưng Yên',
        type: 'pdf',
        url: 'https://storage.cloud.google.com/ilotusland-test/%5BiLotusLand%5D%20B%E1%BA%A3ng%20m%C3%B4%20t%E1%BA%A3%20vai%20tr%C3%B2%2C%20tr%C3%A1ch%20nhi%E1%BB%87m%20c%E1%BB%A7a%20Senior%20Full%20Stack%20Developer.pdf',
        size: '32KB',
      },
    ],
    createdUser: dummyAssignee0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const dummyTicketsByList = [
  {
    _id: 0,
    title: '[AAA] Ticket 111',
    assignee: dummyAssignee0,
    stageId: 0,
    priority: 1,
    dueDate: new Date('2024-04-29').getTime(),
  },
  {
    _id: 1,
    title: '[AAA] Ticket 222',
    assignee: dummyAssignee0,
    stageId: 2,
    priority: 2,
    dueDate: new Date('2024-05-29').getTime(),
  },
  {
    _id: 2,
    title: '[AAA] Ticket 333',
    assignee: dummyAssignee1,
    stageId: 4,
    priority: 0,
    dueDate: new Date('2024-05-01').getTime(),
  },
  {
    _id: 3,
    title: '[BBB] Ticket 444',
    assignee: dummyAssignee1,
    stageId: 1,
    priority: 1,
    dueDate: new Date('2024-09-29').getTime(),
  },
  {
    _id: 4,
    title: '[BBB] Ticket 555',
    assignee: dummyAssignee1,
    stageId: 3,
    priority: 2,
    dueDate: new Date('2024-03-30').getTime(),
  },
];
