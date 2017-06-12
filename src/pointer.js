import {random, width, height} from './helper'
// 点 对象
export default class Pointer {
  constructor (width, height, r) {
    this.x = random(width)
    this.y = random(height)
    // 最小为 10
    this.r = random(r, 1)

    this.targetInit()
  }

  // 生成目标点
  targetInit () {
    this.targetX = random(width)
    this.targetY = random(height)
  }

  move (pointer, targetPointer) {
    let outDo = targetPointer > pointer
    let tween = random(300, 400)
    return outDo ?
      pointer + Math.abs(targetPointer - pointer) / tween :
      pointer - Math.abs(targetPointer - pointer) / tween
  }

  run () {
    // this.x = randomCalc(this.x, random())
    // this.y = randomCalc(this.y, random())
    this.x = this.move(this.x, this.targetX)
    this.y = this.move(this.y, this.targetY)
  }
}