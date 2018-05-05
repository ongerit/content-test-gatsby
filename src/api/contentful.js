// Import
import {createClient} from 'contentful-management'
// Access
const ACCESS_TOKEN = 'enter key'
const SPACE_ID = 'space id'

const client = createClient({
  accessToken: ACCESS_TOKEN
})

// functions
export function publishContent(e, asset_id) {
  e.preventDefault()
  const publishPost = (asset_id)=> {
    client.getSpace(SPACE_ID)
    .then((space) => space.getAsset(asset_id))
    .then((asset) => asset.publish())
    .then((asset) => console.log(`Asset ${asset.sys.id} published.`))
    .catch(console.error)
  }
}

export function unPublishContent(e, asset_id) {
  e.preventDefault()

  client.getSpace(SPACE_ID)
  .then((space) => space.getAsset(asset_id))
  .then((asset) => asset.unpublish())
  .then((asset) => console.log(`Asset ${asset.sys.id} unpublished.`))
  .catch(console.error)
}
