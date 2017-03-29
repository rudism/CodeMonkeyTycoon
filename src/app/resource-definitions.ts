import { Resource, ResourceMap } from './resource';
import { ResourceGroup } from './resource-group';

export const STARTINVENTORY: ResourceMap = {
  'money': 0,
  'storage': 50,
  'bandwidth': 500,
  'memory': 256,
  'cpu': 1
};

var general: ResourceGroup = { name: 'General', resources: [
  {
    name: 'money',
    display: 'Money',
    prefix: '$',
    pluralText: ['',null,'M','B'],
    descText: "Can't buy happiness. Or can it?"
  },
  {
    name: 'knowledge',
    display: 'Knowledge',
    pluralText: ['smarts','Ksmarts','Msmarts','Gsmarts'],
    descText: "Knowledge is power.",
    requirements: { 'money': 0.25 },
    appearText: "While you're watching the cash roll in, why not try to learn new skills?",
    craftText: "Learn"
  }
]};

var resources: ResourceGroup = { name: 'Resources', resources: [
  {
    name: 'storage',
    display: 'Storage Space',
    pluralText: ['MB','GB','TB',null],
    descText: "Size does matter.",
    restorable: true
  },
  {
    name: 'bandwidth',
    display: 'Bandwidth',
    pluralText: ['MB','GB','TB',null],
    descText: "It's like a series of tubes.",
    restorable: true
  },
  {
    name: 'cpu',
    display: "CPU Cores",
    pluralText: ['cores',null,'M cores','B cores'],
    descText: "Of the non-quantum variety.",
    restorable: true
  },
  {
    name: 'memory',
    display: 'Memory',
    pluralText: ['MB','GB','TB',null],
    descText: "640K ought to be enough for anybody.",
    restorable: true
  }
]};

var clients: ResourceGroup = { name: 'Clients', resources: [
  {
    name: 'users',
    display: 'Users',
    pluralText: ['users',null,'M users','B users'],
    descText: "They just suck up bandwidth.",
    attritionable: true,
    value: { 'bandwidth': -0.5 },
    requirements: { 'website': 1 },
    appearText: "Look! You've started attracting users."
  }
]};

var code: ResourceGroup = { name: 'Code', resources: [
  {
    name: 'html',
    display: 'HTML',
    pluralText: ['lines',null,'M lines','B lines'],
    craftText: 'Write',
    destroyText: 'Scrap',
    value: { 'storage': -0.01 },
    descText: "HyperText Markup Language."
  },
  {
    name: 'css',
    display: 'CSS',
    pluralText: ['lines',null,'M lines','B lines'],
    craftText: 'Write',
    destroyText: 'Scrap',
    value: { 'storage': -0.01 },
    descText: "Make it pretty!"
  },
  {
    name: 'javascript',
    display: 'Javascript',
    pluralText: ['lines',null,'M lines','B lines'],
    craftText: 'Write',
    destroyText: 'Scrap',
    value: { 'storage': -0.01 },
    descText: "Used everywhere these days, from static sites to server code."
  },
  {
    name: 'php',
    display: 'PHP',
    pluralText: ['lines',null,'M lines','B lines'],
    craftText: 'Write',
    destroyText: 'Scrap',
    value: { 'storage': -0.01 },
    descText: "Powering the 90's web.",
    requirements: { 'knowledge': 10 },
    appearText: "Look! You've learned a new programming language!"
  },
  {
    name: 'sql',
    display: 'SQL',
    pluralText: ['queries','','M queries','B queries'],
    craftText: 'Write',
    destroyText: 'Scrap',
    value: { 'storage': -0.01 },
    descText: "It's pronounced ess cue ell.",
    requirements: { 'knowledge': 20 },
    appearText: "You've learned something called \"my sequel\". What's that?"
  }
]};

var products: ResourceGroup = { name: 'Products', resources: [
  {
    name: 'website',
    display: "Websites",
    pluralText: ['sites','','M sites','B sites'],
    craftText: 'Deploy',
    destroyText: 'Take Down',
    requirements: { 'html': 2, 'javascript': 2, 'css': 2 },
    value: {
      'html': -10,
      'css': -10,
      'javascript': -5,
      'storage': -1
    },
    descText: "Mostly pictures of cats.",
    generators: { 'users': 0.01 },
    appearText: "Why not publish your first website? Click '+More' to see how much it costs."
  },
  {
    name: 'bannerad',
    display: 'Banner Ad',
    pluralText: ['ads','','M ads','B ads'],
    craftText: 'Place',
    destroyText: 'Remove',
    descText: "Makes money but slows user acquisition.",
    requirements: { 'users': 5 },
    value: {
      'html': -5,
      'css': -5,
      'javascript': -5,
      'users': -5,
      'storage': -1
    },
    generators: {
      'money': 0.0005,
    },
    modifiers: { 'users': 0.5 },
    appearText: "I bet you'd make some money if you showed ads to those users."
  },
  {
    name: 'webapp',
    display: "Web App",
    pluralText: ['sites','','M sites','B sites'],
    craftText: "Deploy",
    destroyText: "Take Down",
    descText: "Generates users and a bit of money.",
    requirements: { 'sql': 2 },
    value: {
      'html': -20,
      'css': -10,
      'javascript': -10,
      'php': -30,
      'sql': -10,
      'mysql': -1,
      'storage': -10,
      'cpu': -0.1,
      'memory': -10
    },
    generators: {
      'users': 0.02,
      'money': 0.001
    },
    appearText: "You should put your new skills to use and make a web app!"
  }
]};

var infrastructure: ResourceGroup = { name: 'Infrastructure', resources: [
  {
    name: 'mysql',
    display: "MySQL DB",
    pluralText: ['dbs','','M dbs','B dbs'],
    craftText: 'Deploy',
    destroyText: 'Kill',
    requirements: { 'sql': 2 },
    descText: "A non-scaling relational database.",
    value: {
      'sql': -10,
      'storage': -10,
      'cpu': -0.1,
      'memory': -10
    }
  }
]};

var staff: ResourceGroup = { name: 'Staff', resources: [
  {
    name: 'rentacoder',
    display: 'Rent-A-Coder',
    pluralText: ['coders','','M coders','B coders'],
    craftText: 'Hire',
    destroyText: 'Fire',
    requirements: { 'money': 4 },
    descText: "Draws a small salary, but writes code for you!",
    generators: {
      'html': 0.01,
      'css': 0.01,
      'javascript': 0.01,
      'php': 0.002,
      'sql': 0.002,
      'money': -0.01
    },
    appearText: "All that coding is tiresome. Why not pay someone else to do it?"
  }
]};

export const RESOURCEDEF: ResourceGroup[] = [
  general,
  resources,
  clients,
  code,
  infrastructure,
  products,
  staff
];
