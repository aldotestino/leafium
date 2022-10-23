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
    image: './abeewaybg.jpeg',
    title: 'Indoor/Outdoor Location Tracking',
    body: 'Go beyond GPS with our power-efficient tracking devices, anywhere, indoors and outdoors.',
    tag: 'Users',
    tagColor: 'teal.400'
  },
  {
    image: './actilitybg.jpeg',
    title: 'IoT Roaming Partner',
    body: 'Actility has a strong background in large-scale projectdelivery and a heritage in carrier-grade systems.',
    tag: 'Roaming',
    tagColor: 'purple.400'
  },
  {
    image: './agulusbg.jpeg',
    title: 'Smarter Agricolture',
    body: 'Pushing the boundaries of agtech by automating irrigation for farms across the eastern United States.',
    tag: 'Users',
    tagColor: 'teal.400'
  },
  {
    image: './aiotbg.jpeg',
    title: 'Smart Gateways',
    body: 'Gateways defying obsolenscence trough the most current network protocols - the first with embedded environmental sensors.',
    tag: 'Hotspots',
    tagColor: 'blue.400'
  },
  {
    image: './awairbg.jpeg',
    title: 'Air Quality Monitoring',
    body: 'Our mission is to improve people’s lives, one breath at a time.',
    tag: 'Users',
    tagColor: 'teal.400'
  },
  {
    image: './datacakebg.jpeg',
    title: 'Enterprise IoT Platforms',
    body: 'Create IoT applications in minutes on the Datacake low code platform without programming.',
    tag: 'Integrations',
    tagColor: 'yellow.400'
  },
];