import React, { Component } from 'react'
import {
  Button,
  CameraRoll,
  Dimensions,
  FlatList,
  GetPhotosReturnType,
  Image,
  TouchableOpacity,
} from 'react-native'

type PhotoEdge = GetPhotosReturnType['edges'][0]
type PhotoNode = PhotoEdge['node']

interface State {
  photos: PhotoNode[]
  after?: string
  hasNext?: boolean
}
type Props = {}

enum PhotoItemPerRow {
  CameraRoll = 3,
}
const itemDimension =
  Dimensions.get('window').width / PhotoItemPerRow.CameraRoll
const width = itemDimension
const height = itemDimension

export class CameraManager extends Component<Props, State> {
  state: State = {
    photos: [],
    after: '',
    hasNext: true,
  }

  getPhotos = async ({
    first = 20,
    after = '',
  }: { first?: number; after?: string } = {}) => {
    if (!this.state.hasNext) {
      return
    }

    try {
      const results: GetPhotosReturnType = await CameraRoll.getPhotos({
        first,
        after: !after ? undefined : after,
        assetType: 'Photos',
      })

      const next: State = {
        photos: this.state.photos,
        after: results.page_info.end_cursor,
        hasNext: results.page_info.has_next_page,
      }

      if (results) {
        const fetched = results.edges.map(edge => edge.node)

        if (fetched.length > 0) {
          next.photos = [...next.photos, ...fetched]
        }
      }

      this.setState(next)
    } catch (err) {
      console.log(`error... `, err)
    }
  }

  renderItem = ({ item }: { item: PhotoNode }) => {
    return (
      <TouchableOpacity>
        <Image
          style={{ width, height }}
          source={{ width, height, uri: item.image.uri }}
        />
      </TouchableOpacity>
    )
  }

  loadCameraManager = async () => {
    await this.getPhotos()
  }

  fetchData = async () => {
    await this.getPhotos({
      after: this.state.after,
    })
  }

  render() {
    return (
      <>
        <Button
          title="Load Camera Roll's Image"
          onPress={this.loadCameraManager}
        />
        <FlatList
          data={this.state.photos}
          keyExtractor={(_, index) => `${index}`}
          numColumns={PhotoItemPerRow.CameraRoll}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.5}
          scrollEventThrottle={150}
          removeClippedSubviews={true}
          onEndReached={this.fetchData}
        />
      </>
    )
  }
}
