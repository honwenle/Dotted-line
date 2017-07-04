import Canvas from '../src/app.js'

/**
 * 获取 id 值为 id 的dom
 * @param {string} id id值
 */
let $ = id => document.getElementById(id)

const canvas = $('canvas')

let stage;

function stageInit () {
  stage = new Canvas({
    el: canvas,
    width: 800,
    height: 800,
    limit: 15,
    time: 30,
    color: colors
  })
}

// 点
const pointers = $('pointers')
let pointer_nums = pointers.value

pointers.addEventListener('input', ({target: {value}}) => {
  setPointersText(value)
  setPointers(value)
})

/**
 * 设置点的数量
 * @param {number} value 值
 */
function setPointers (value) {
  if (stage.pointers.length > value) {
    stage.delPointer()
    setPointers(value)
  }
  if (stage.pointers.length < value) {
    stage.addPointer()
    setPointers(value)
  }
}
// 点的文字
const pointers_text = $('pointers_text')
/**
 * 设置文字的值
 * @param {string|number} val 值
 */
const setPointersText = val => $('pointers_text').innerHTML = val

// 颜色
const $color = $('color')
$color.addEventListener('change', function (event) {
  colors.push(this.value)
  colorInitElements()
})

const $colors = $('colors')
const colors = ['#f3f3f3']

colorInitElements()
/**
 * 根据颜色
 */
function colorInitElements () {
  $colors.innerHTML = ''
  colors.forEach((color, index) => {
    addColor(color, index)
  })
  // 重新生成舞台布景
  stageInit()
}
/**
 * 添加一个颜色
 * @param {string} color 添加一个颜色
 */
function addColor (color, index) {
  $colors.appendChild(colorElementInit(color, index))
}
/**
 * 生成一个颜色元素
 * @return {HTMLElement}
 */
function colorElementInit (color, index) {
  const $div = document.createElement('div')
  $div.style.background = color
  $div.index = index
  return addRemoveColor($div)
}
/**
 * 添加删除功能
 * @param {node} $el 为元素添加删除功能
 * @return {HTMLElement}
 */
function addRemoveColor ($el) {
  $el.addEventListener('click', function () {
    const color = getComputedStyle($el)['background-color']
    colors.splice($el.index, 1)
    colorInitElements()
  })
  return $el
}