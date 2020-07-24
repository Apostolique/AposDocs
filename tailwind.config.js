const defaultTheme = require('tailwindcss/defaultTheme')

colors = {
   code: {
      blue: '#3498db',
      gray: '#5c6370',
      green: '#2ecc71',
      indigo: '#6c71c4',
      light: '#d2d6db',
      orange: '#e67e22',
      red: '#e74c3c',
      yellow: '#f1c40f',
   },
   gray: {
      '50': '#fbfbfb',
      '100': '#f7f7f7',
      '200': '#ebebeb',
      '300': '#dcdcdc',
      '400': '#b2b2b2',
      '500': '#808080',
      '600': '#636363',
      '700': '#515151',
      '800': '#3f3f3f',
      '900': '#2e2e2e',
      '950': '#111111',
      '980': '#080808'
   }
}

module.exports = {
   purge: {
      content: ['./dist/**/*.html']
   },
   theme: {
      extend: {
         colors,
         spacing: {
            '2px': '2px',
            '16/9': '56.25%',
         },
         fontFamily: {
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
         },
         maxHeight: {
            'none': 'none',
         },
         transitionProperty: {
            'left': 'left, margin-left',
            'transform-visibility': 'transform, visibility',
         },
         screens: {
            'lm': { raw: '(prefers-color-scheme: light)' },
         },
      },
      typography: {
         default: {
            css: {
               color: defaultTheme.colors.gray[300],
               '[class~="lead"]': {
                  color: defaultTheme.colors.gray[300],
               },
               a: {
                  color: defaultTheme.colors.gray[100]
               },
               strong: {
                  color: defaultTheme.colors.gray[100]
               },
               'ol > li::before': {
                  color: defaultTheme.colors.gray[400]
               },
               'ul > li::before': {
                  backgroundColor: defaultTheme.colors.gray[600]
               },
               hr: {
                  borderColor: defaultTheme.colors.gray[700]
               },
               blockquote: {
                  color: defaultTheme.colors.gray[100],
                  borderLeftColor: defaultTheme.colors.gray[700]
               },
               h1: {
                  color: defaultTheme.colors.gray[100],
               },
               h2: {
                  color: defaultTheme.colors.gray[100],
               },
               h3: {
                  color: defaultTheme.colors.gray[100],
               },
               h4: {
                  color: defaultTheme.colors.gray[100],
               },
               'figure figcaption': {
                  color: defaultTheme.colors.gray[600],
               },
               thead: {
                  color: defaultTheme.colors.gray[100],
                  borderBottomColor: defaultTheme.colors.gray[400],
               },
               'tbody tr': {
                  borderBottomColor: defaultTheme.colors.gray[700],
               },
               pre: null,
               code: null,
               'pre code': null,
               img: {
                  'margin-top': '0.5rem',
                  'margin-bottom': '0.5rem',
                  'margin-right': '0.5rem',
                  display: 'inline'
               }
            }
         },
         lm: {
            css: {
               color: defaultTheme.colors.gray[700],
               '[class~="lead"]': {
                  color: defaultTheme.colors.gray[700],
               },
               a: {
                  color: defaultTheme.colors.gray[900]
               },
               strong: {
                  color: defaultTheme.colors.gray[900]
               },
               'ol > li::before': {
                  color: defaultTheme.colors.gray[600]
               },
               'ul > li::before': {
                  backgroundColor: defaultTheme.colors.gray[400]
               },
               hr: {
                  color: defaultTheme.colors.gray[300]
               },
               blockquote: {
                  color: defaultTheme.colors.gray[900],
                  borderLeftColor: defaultTheme.colors.gray[300]
               },
               h1: {
                  color: defaultTheme.colors.gray[900],
               },
               h2: {
                  color: defaultTheme.colors.gray[900],
               },
               h3: {
                  color: defaultTheme.colors.gray[900],
               },
               h4: {
                  color: defaultTheme.colors.gray[900],
               },
               'figure figcaption': {
                  color: defaultTheme.colors.gray[600],
               },
               thead: {
                  color: defaultTheme.colors.gray[900],
                  borderBottomColor: defaultTheme.colors.gray[400],
               },
               'tbody tr': {
                  borderBottomColor: defaultTheme.colors.gray[300],
               }
            }
         }
      }
   },
   plugins: [
      require('@tailwindcss/ui'),
      require('@tailwindcss/typography')
   ],
}
