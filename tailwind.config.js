/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      title: ['Rubik Mono One', 'sans-serif'],
      body: ['Rubik', 'sans-serif'],
      aolol: ['Times New Roman', 'serif'],
      vaporwave: ['Arial', 'sans-serif'],
      interstellar: ['Arial', 'sans-serif'],
      dimMode: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'xmtp-background-purple': "#F5F4FF",
        'xmtp-button-purple': '#968CFF',
        'xmtp-button-text': '#7C72E2',
        'xmtp-button-shadow': '#473E6B',
        'xmtp-purple-text': '#2F2A47',
        'xmtp-purple-title': '#5E58A5',
        'xmtp-text-box-border': '#8381FF',
        'xmtp-menu-bar-bottom-border': '#dddaff',
        'xmtp-copyright': '#3F3958',
        'dms-open-prototype-blue': '#2b364a',
        'dms-open-purple': '#553cee',
        'dms-open-gray': '#959595',
        'dms-open-purple-text': '#4F46E5',
        'dms-open-purple-button-border': '#4F46E5',
        'dms-open-very-red': '#FF0000',
      },
      width: {
        'inherit': 'inherit',
        '90': '90%'
      },
      height: {
        'inherit': 'inherit',
      },
      maxWidth: {
        'max-lg': '1080px'
      },
      minHeight: {
        'chat': '36px'
      },
      backgroundImage: {
        'background-image': "url(/images/golden-gate.svg)",
        'hand-background': "url(/images/xmtp-hand-phone.svg)",
        'grid-background': "url(/images/backgrounds/gridBG.png)",
        'dark-grid-background': "url(/images/backgrounds/darkBG.png)",
        'aolol-background': "url(/images/backgrounds/AOLOLBG.png)",
        'interstellar-background': "url(/images/backgrounds/interstellarBG.png)",
        'vaporwave-background': "url(/images/backgrounds/vaporwaveBG.png)",
      },
      backgroundPosition: {
        'left-bottom-4': 'left bottom 0.75rem',
        'center-top': 'center top'
      }
    },
  },
  plugins: [],
}
