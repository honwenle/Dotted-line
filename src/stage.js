/**
 * 舞台
 */
import Pointer from './pointer.js'
import {width, height, random} from './helper'

class Canvas {
  constructor ({
    el,
    limit = 10,
    pointerWidth = 15,
    width = width,
    height = height,
    time = 5
  }) {
    // 防止创建多次
    this.isInited = false;
    // 限制点数量
    this.pointerLimit = limit;
    // 点的宽度
    this.pointerWidth = pointerWidth;
    // 点集合
    this.pointers = [];
    // 上下文
    this.ctx = null;
    // 元素
    this.el = null;
    // 时间
    this.time = time

    this.init(el, width, height)

    this.render()
  }
  // 初始化
  init ($el, width, height) {
    // 防止初始化两次
    if (this.isInited) return
    this.isInited = true
    // 保存 长宽
    this.width = width;
    this.height = height;
    // 保存原本元素
    this.el = $el
    this.el.width = width;
    this.el.height = height;
    // 获取上下文
    this.ctx = this.el.getContext('2d')

    // 画点
    for (let i = 0; i < this.pointerLimit; i++) {
      this.pointerInit()
    }

  }

  // 生成点
  pointerInit () {
    let pointer = new Pointer(this.width, this.height, this.pointerWidth, random(this.time))
    this.pointers.push(pointer)
    this.pointerRender(pointer)
  }

  // 画点
  pointerRender (pointer) {
    this.ctx.beginPath()
    this.ctx.arc(
      pointer.x,
      pointer.y,
      pointer.r,
      0,
      2 * Math.PI,
      true
    )
    this.ctx.fill()
  }
  /**
   * 设置点数限制
   * @param {number} limit
   */
  setLimit (limit) {
    if (limit < 0) limit = 0
    let _limit = this.pointers.length
    if (limit > _limit) {
      for(let i = 0; i < limit - _limit; i++) {
        this.pointerInit()
      }
    } else {
      for(let i = 0; i < _limit - limit; i++) {
        this.pointers.shift()
      }
    }
  }
  /**
   * 添加点
   */
  addPointer () {
    this.setLimit(this.pointers.length + 1)
  }
  /**
   * 删除点
   */
  delPointer () {
    this.setLimit(this.pointers.length - 1)
  }


  // 点跑起来
  pointerRun () {
    this.pointers.forEach((pointer) => {
      pointer.run()
      this.pointerRender(pointer)
    })
  }

  // 画线
  lineRun () {
    let pointer = this.pointers
    let length = pointer.length
    let ctx = this.ctx
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (i !== j) {
          ctx.beginPath()
          ctx.moveTo(pointer[i].x, pointer[i].y)
          ctx.lineTo(pointer[j].x, pointer[j].y)
          ctx.stroke()
        }
      }
    }
  }

  // 画
  render () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.fillStyle = '#f3f3f3'
    this.ctx.strokeStyle = '#f3f3f3'
    this.pointerRun()
    this.lineRun()

    requestAnimationFrame(this.render.bind(this))
  }
}

export default Canvas;