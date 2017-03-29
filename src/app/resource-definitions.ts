import { Resource, ResourceMap } from './resource';
import { ResourceGroup } from './resource-group';

export const STARTINVENTORY: ResourceMap = {
  'money': 0,
  'storage': 50,
  'bandwidth': 1000,
  'memory': 1000,
  'cpu-cores': 1,
  'html': 50,
  'javascript': 50
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
    name: 'user-capacity',
    display: 'User Cap',
    pluralText: ['users',null,'M users','B users'],
    restorable: true
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
    name: 'cpu-cores',
    display: "CPU Cores",
    pluralText: ['cores',null,'M cores','B cores'],
    descText: "",
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
    value: { 'bandwidth': -0.01, 'user-capacity': -1 }
  },
  {
    name: 'ad-users',
    display: 'Ad Users',
    pluralText: ['users',null,'M users','B users'],
    descText: "Haven't they heard of ad blockers?",
    attritionable: true,
    value: { 'bandwidth': -0.01, 'user-capacity': -1 },
    generators: { 'money': 0.0005 }
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
    name: 'javascript',
    display: 'Javascript',
    pluralText: ['lines',null,'M lines','B lines'],
    craftText: 'Write',
    destroyText: 'Scrap',
    value: { 'storage': -0.01 },
    descText: "Used everywhere these days, from static sites to server code."
  }
]};

var products: ResourceGroup = { name: 'Products', resources: [
  {
    name: 'website',
    display: "Websites",
    pluralText: ['sites','','M sites','B sites'],
    craftText: 'Deploy',
    destroyText: 'Take Down',
    value: {
      'html': -5,
      'javascript': -5,
      'user-capacity': 10
    },
    descText: "Mostly pictures of cats.",
    generators: { 'users': 0.01 }
  },
  {
    name: 'ad-website',
    display: 'Ad Websites',
    pluralText: ['sites',null,'M sites','B sites'],
    craftText: 'Deploy',
    destroyText: 'Takedown',
    descText: "Slows down user acquisition, but some will earn money.",
    value: {
      'website': -1,
      'html': -5,
      'javascript': -5,
      'user-capacity': 10
    },
    generators: { 'users': '-0.005', 'ad-users': 0.005 },
    modifiers: { 'users': 0.5 }
  },
  {
    name: 'power',
    display: 'Power',
    pluralText: ['sites',null,'M sites','B sites'],
    craftText: 'Deploy',
    destroyText: 'Takedown',
    descText: "Slows down user acquisition, but some will earn money.",
    value: {
      'ad-website': -2,
      'html': -5,
      'javascript': -5,
      'user-capacity': 10
    },
    generators: { 'ad-users': 0.005 },
    modifiers: { 'users': 0.5 }
  }
]};

export const RESOURCEDEF: ResourceGroup[] = [
  general,
  resources,
  clients,
  code,
  products
];
