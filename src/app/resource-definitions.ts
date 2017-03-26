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
    pluralText: '$',
    descText: "Can't buy happiness. Or can it?"
  },
  {
    name: 'storage',
    display: 'Storage Space',
    pluralText: 'GB',
    descText: "It's not the size that matters. Actully, yes it is.",
    restorable: true
  },
  {
    name: 'bandwidth',
    display: 'Bandwidth',
    pluralText: 'GB',
    descText: "Data caps are horse poop!",
    restorable: true
  }
]};

var clients: ResourceGroup = { name: 'Clients', resources: [
  {
    name: 'basic-users',
    display: 'Basic Users',
    pluralText: 'users',
    requirements: { 'basic-website': 1 },
    appearText: "Some users are reading your website!",
    value: { 'bandwidth': -0.1 },
    descText: "These guys just use up bandwidth.",
    attritionable: true
  },
  {
    name: 'ad-users',
    display: 'Ad Supported Users',
    pluralText: 'users',
    requirements: { 'basic-webapp': 1 },
    appearText: "Some people are actually paying to use that app!",
    value: { 'bandwidth': -0.1 },
    generators: { 'money': 0.001 },
    descText: "They use up bandwidth, but generate a small amount of income.",
    attritionable: true
  }
]};

var code: ResourceGroup = { name: 'Code', resources: [
  {
    name: 'html',
    display: 'HTML',
    pluralText: 'lines',
    craftText: 'Write',
    destroyText: 'Scrap',
    requirements: {},
    value: { 'storage': -0.01 },
    descText: "HyperText Markup Language."
  },
  {
    name: 'javascript',
    display: 'Javascript',
    pluralText: 'lines',
    craftText: 'Write',
    destroyText: 'Scrap',
    requirements: {},
    value: { 'storage': -0.01 },
    descText: "Used everywhere these days, from static sites to server code."
  },
  {
    name: 'php',
    display: 'PHP',
    pluralText: 'lines',
    craftText: 'Write',
    destroyText: 'Scrap',
    requirements: { 'basic-website': 2 },
    appearText: "You've learned PHP and SQL! Start creating some spaghetti!",
    value: { 'storage': -0.01 },
    descText: "A server-side scripting language."
  },
  {
    name: 'sql',
    display: 'SQL',
    pluralText: 'queries',
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
    pluralText: 'databases',
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
    pluralText: 'sites',
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
      'bandwidth': 5
    },
    generators: { 'basic-users': 0.01 },
    descText: "Mostly pictures of cats."
  },
  {
    name: 'basic-webapp',
    display: 'Basic Web Apps',
    pluralText: 'apps',
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
      'bandwidth': 10
    },
    generators: {
      'basic-users': 0.05,
      'ad-users': 0.05
    },
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
