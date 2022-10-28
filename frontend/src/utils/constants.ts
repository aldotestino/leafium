export interface SupportedDevice {
  deviceName: string
  tags: string[]
  links: {
    purchase?: string
    community?: string
    support?: string
  }
}

export const supportedDevices: SupportedDevice[] = [
  {
    deviceName: 'Aitek',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Atom',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Support'
    }
  },
  {
    deviceName: 'Bobcat',
    tags: ['LoRaWAN', '5G'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Browan/MerryIoT',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Cal-Chip',
    tags: ['LoRaWAN', '5G'],
    links: {
      purchase: 'Purchase',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'ClodPi',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'COTX Networks',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Website',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Controllino',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Support'
    }
  },
  {
    deviceName: 'Dragino',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Dusun',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'EDATEC',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Finestra',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      support: 'Support'
    }
  },
  {
    deviceName: 'FreedomFi',
    tags: ['LoRaWAN', '5G'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'FXTec Linxdot',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Heltec',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Hummingbird',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      support: 'Support'
    }
  },
  {
    deviceName: 'Kerlink',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Support'
    }
  },
  {
    deviceName: 'LongAP',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Midas',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Milesight',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'MNTD.',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Support'
    }
  },
  {
    deviceName: 'Nebra',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Osprey (Ingenious Technology)',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Pisces/Green Palm Technologies',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'RisingHF',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Sensecap',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      community: 'Community',
      support: 'Email Support'
    }
  },
  {
    deviceName: 'Ugwan (Amber-Link)',
    tags: ['LoRaWAN'],
    links: {
      purchase: 'Purchase',
      support: 'Email Support'
    }
  },
];

export interface UseCase {
  image: string
  title: string
  body: string
  tag: string
  tagColor: string
}

export const useCases: UseCase[] = [
  {
    image: './smart_cities.jpeg',
    title: 'Smart Cities',
    body: 'Using IoT technologies with a variety of Smart devices to visualize and analyze comprehensive real-time data, cities can respond dynamically by optimizing asset utilization and allocation of city resources.',
    tag: 'Users',
    tagColor: 'teal.400'
  },
  {
    image: './iot_roaming.jpeg',
    title: 'IoT Roaming',
    body: 'IoT roaming occurs when a connected device or sensor connects to a network other than its home network, either temporarily or permanently, in cases of permanent roaming.',
    tag: 'Roaming',
    tagColor: 'purple.400'
  },
  {
    image: './smart_agricolture.jpg',
    title: 'Smart Agricolture',
    body: 'The concept of using LoRaWAN based IoT solutions for smart agriculture practices is taking flight as farmers now can easily visualize, analyze and make more informed decisions regarding their crops.',
    tag: 'Users',
    tagColor: 'teal.400'
  },
  {
    image: './smart_gateways.jpeg',
    title: 'Smart Gateways',
    body: 'An intelligent hub that can simultaneously control devices from safety management to energy management with consumption monitoring and load control and lighting controls',
    tag: 'Hotspots',
    tagColor: 'yellow.400'
  },
  {
    image: './logistics_management.jpeg',
    title: 'Air Quality Monitoring',
    body: 'Thanks to LoRaWAN based IoT solutions, supply chain and logistics companies successfully track high-value assets, including those in transit.',
    tag: 'Users',
    tagColor: 'teal.400'
  },
  {
    image: './smart_healthcare.jpeg',
    title: 'Enterprise IoT Platforms',
    body: 'Low power, low cost, and consistent performance make LoRaWAN networks ideal for essential intelligent healthcare applications. LoRaWAN based IoT solutions can continuously monitor high-risk patients or systems.',
    tag: 'Users',
    tagColor: 'teal.400'
  },
];