import { Resource, ResourceMap } from './resource';
import { ResourceGroup } from './resource-group';

export const STARTINVENTORY: ResourceMap = {
  'money': 100,
  'storage': 50
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
    name: 'storage',
    display: 'Storage Space',
    pluralText: ['MB','GB','TB',null],
    descText: "It's not the size that matters. Actully, yes it is.",
    restorable: true
  },
  {
    name: 'capacity',
    restorable: true
  }
]};

var clients: ResourceGroup = { name: 'Clients', resources: [
  {
    name: 'basic-users',
    display: 'Basic Users',
    pluralText: ['users',null,'M users','B users'],
    requirements: { 'basic-website': 1 },
    appearText: "Some users are reading your website!",
    value: { 'capacity': -1 },
    descText: "These guys just use up bandwidth.",
    attritionable: true
  },
  {
    name: 'ad-users',
    display: 'Ad Supported Users',
    pluralText: ['users',null,'M users','B users'],
    requirements: { 'basic-webapp': 1 },
    appearText: "You've started earning a bit of cash!",
    value: { 'capacity': -1 },
    generators: { 'money': 0.001 },
    descText: "They use up bandwidth, but generate a small amount of income.",
    attritionable: true
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
  },
  {
    name: 'php',
    display: 'PHP',
    pluralText: ['lines',null,'M lines','B lines'],
    craftText: 'Write',
    destroyText: 'Scrap',
    requirements: { 'basic-website': 2 },
    appearText: "You've learned PHP! Also something called \"my sequel,\" what's that?",
    value: { 'storage': -0.01 },
    descText: "A server-side scripting language."
  },
  {
    name: 'sql',
    display: 'SQL',
    pluralText: ['queries',null,'M queries','B queries'],
    craftText: 'Write',
    destroyText: 'Scrap',
    requirements: { 'basic-website': 2 },
    value: { 'storage': -0.01 },
    descText: "Database querying language."
  }
]};

var infrastructure: ResourceGroup = { name: 'Infrastructure', resources: [
  {
    name: 'mysql-db',
    display: 'MySQL Database',
    pluralText: ['databases',null,null,null],
    craftText: 'Deploy',
    destroyText: 'Tear Down',
    requirements: { 'basic-website': 2 },
    value: { 'storage': -1 },
    descText: "A free but not very scalable database instance.",
    restorable: true
  }
]};

var products: ResourceGroup = { name: 'Products', resources: [
  {
    name: 'basic-website',
    display: 'Basic Websites',
    pluralText: ['sites',null,null,null],
    craftText: 'Publish',
    destroyText: 'Shut Down',
    requirements: {
      'html': 5,
      'javascript': 10
    },
    value: {
      'html': -5,
      'javascript': -10,
      'storage': -0.1,
      'capacity': 10
    },
    appearText: "You've got enough code for your first website!",
    generators: { 'basic-users': 0.01 },
    descText: "Mostly pictures of cats."
  },
  {
    name: 'basic-webapp',
    display: 'Basic Web Apps',
    pluralText: ['apps',null,null,null],
    craftText: 'Deploy',
    destroyText: 'Shut Down',
    requirements: {
      'php': 20,
      'sql': 5,
      'html': 10,
      'javascript': 20,
      'mysql-db': 1
    },
    value: {
      'php': -20,
      'sql': -5,
      'html': -10,
      'javascript': -20,
      'mysql-db': -1,
      'storage': -1,
      'capacity': 100
    },
    generators: {
      'basic-users': 0.05,
      'ad-users': 0.05
    },
    appearText: "Looks like you've got everything you need for your first web app!",
    descText: "The world needs more ToDo apps!"
  }
]};

export const RESOURCEDEF: ResourceGroup[] = [
  general,
  clients,
  code,
  infrastructure,
  products
];
