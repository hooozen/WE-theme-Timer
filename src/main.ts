import Mottos from "./script/Mottos.js"
import Images from "./script/Images.js"

function $(id: string): HTMLElement {
  return document.querySelector(id) as HTMLElement
}


const mottos = new Mottos($('#motto'))
const images = new Images($('#bg'), $('#maskStyle'))

declare global {
  interface Window {
    wallpaperPropertyListener: any
  }
}

window.wallpaperPropertyListener = {
  userDirectoryFilesAddedOrChanged: function (propertyName: string, changedFiles: string[]) {
    // propertyName is the name of the property that triggered the event.
    // changedFiles contains all added (or modified) file paths
    images.setCustomImages(changedFiles)
  },
  userDirectoryFilesRemoved: function (propertyName: string, removedFiles: string[]) {
    // propertyName is the name of the property that triggered the event.
    // removedFiles contains all removed file paths
    images.setCustomImages([])
  },

  applyUserProperties: function (properties: any) {

    if (properties.imageSwitchFrequency) {
      images.setImageSwitchFrequency(properties.imageSwitchFrequency.value)
    }
    if (properties.maskTransparency) {
      if (properties.maskTransparency.value) {
        images.setMaskTransparency(properties.maskTransparency.value)
      }
    }


    if (properties.customMottoEnable) {
      mottos.setCustomMottoEnable(properties.customMottoEnable.value)
    }
    if (properties.usingDefaultMottos) {
      mottos.setUsingDefaultMottos(properties.usingDefaultMottos.value)
    }
    if (properties.customMottos) {
      mottos.setCustomMottos(properties.customMottos.value)
    }
    if (properties.mottoSwitchFrequency) {
      mottos.setMottoSwitchFrequency(properties.mottoSwitchFrequency.value)
    }
    // refresh()
  },

};