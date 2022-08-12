import Mottos from "./script/Mottos.js"
import Timer from "./script/Timer.js"
import Images from "./script/Images.js"
import Title from "./script/Title.js"
import Clock from "./script/Clock.js"

import { $ } from "./utils.js"


const title = new Title($('#title') as HTMLElement)
const timer = new Timer($('#timer') as HTMLElement)
const mottos = new Mottos($('#motto') as HTMLElement)
const images = new Images($('#bg') as HTMLEmbedElement, $('#maskStyle') as HTMLElement)
const clock = new Clock($('#clockOuter') as HTMLElement)

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
    if (properties.title) {
      title.setText(properties.title.value)
    }

    if (properties.deadline) {
      if (properties.deadline.value) {
        timer.setDeadline(properties.deadline.value)
      }
    }
    if (properties.precision) {
      timer.setPrecision(properties.precision.value)
    }


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

    if (properties.showClock) {
      clock.setClockVisible(properties.showClock.value)
    }
    if (properties.showNumClock) {
      clock.setNumVisible(properties.showNumClock.value)
    }
    // refresh()
  },

};