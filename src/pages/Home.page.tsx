import { Image, Title } from '@mantine/core'
import { Page } from '@components'

export function HomePage() {
  return (
    <Page>
      <Title order={1}>User Management App</Title>
      <p>View the README to learn more</p>
      <Image w={200} src="uploads/caitlin.png" alt="Alice" radius={'md'} />
    </Page>
  )
}
