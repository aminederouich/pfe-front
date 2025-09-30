import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    tKey: 'nav.dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW', // Could translate with t('nav.new') if integrated where rendered
    },
  },
  {
    component: CNavTitle,
    name: 'Theme',
    tKey: 'nav.theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    tKey: 'nav.colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    tKey: 'nav.typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
    tKey: 'nav.components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    tKey: 'nav.base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        tKey: 'nav.accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        tKey: 'nav.breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        tKey: 'nav.cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        tKey: 'nav.carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        tKey: 'nav.collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        tKey: 'nav.listGroup',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        tKey: 'nav.navsTabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        tKey: 'nav.pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        tKey: 'nav.placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        tKey: 'nav.popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        tKey: 'nav.progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        tKey: 'nav.spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        tKey: 'nav.tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tabs',
        tKey: 'nav.tabs',
        to: '/base/tabs',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        tKey: 'nav.tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    tKey: 'nav.buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        tKey: 'nav.buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        tKey: 'nav.buttonsGroups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        tKey: 'nav.dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    tKey: 'nav.forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        tKey: 'nav.formControl',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        tKey: 'nav.select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        tKey: 'nav.checksRadios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        tKey: 'nav.range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        tKey: 'nav.inputGroup',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        tKey: 'nav.floatingLabels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        tKey: 'nav.layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        tKey: 'nav.validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    tKey: 'nav.charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    tKey: 'nav.icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        tKey: 'nav.coreuiFree',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        tKey: 'nav.coreuiFlags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        tKey: 'nav.coreuiBrands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    tKey: 'nav.notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        tKey: 'nav.alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        tKey: 'nav.badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        tKey: 'nav.modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        tKey: 'nav.toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    tKey: 'nav.widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
]

export default _nav
