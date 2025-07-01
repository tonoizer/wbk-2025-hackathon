export const navigationItems = [
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/',
    disabled: false,
  },
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/dashboard',
    disabled: false,
  },
]

export const socialItemsWithOutLabel = [
  {
    icon: 'i-lucide-mail',
    to: 'mailto:hackathon@kevinbeier.com',
    target: '_blank',
  },
  {
    icon: 'i-simple-icons-github',
    to: 'https://github.com/BeierKevin',
    target: '_blank',
  },
]

export const socialItemsWithLabel = [
  {
    label: 'Mail',
    icon: 'i-lucide-mail',
    to: 'mailto:hackathon@kevinbeier.com',
    target: '_blank',
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/BeierKevin',
    target: '_blank',
  },
]

export const legalItems = [
  {
    label: 'Impressum',
    icon: 'i-lucide-file',
    to: '/impressum',
  },
  {
    label: 'Privacy Policy',
    icon: 'i-lucide-shield-check',
    to: '/privacy-policy',
  },
  {
    label: 'Terms of Use',
    icon: 'i-lucide-scale',
    to: '/terms',
  },
]

export const desktopNavigationItems = [
  [
    {

    },
  ],
  navigationItems,
  socialItemsWithOutLabel,
]

export const mobileNavigationItems = [
  navigationItems,
  socialItemsWithLabel,
]
