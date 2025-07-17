import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'fitspace-gym-membership-app-syraba14',
  authRequired: true
})

export default blink