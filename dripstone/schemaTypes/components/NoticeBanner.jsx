import {Card, Text} from '@sanity/ui'

export function NoticeBanner(props) {
  return (
    <Card padding={4} radius={2} tone="caution" marginBottom={4}>
      <Text size={2} weight="bold">
        Please Note: If any of the fields below is left empty, the site automatically shows its original default content; your website will not remain without some form of content at any given time.
      </Text>
    </Card>
  )
}