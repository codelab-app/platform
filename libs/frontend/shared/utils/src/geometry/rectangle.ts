/* eslint-disable id-length */
import type { Point } from './point'

export class Rect {
  bottom: number

  height: number

  left: number

  right: number

  top: number

  width: number

  x: number

  y: number

  constructor(x?: number, y?: number, width?: number, height?: number) {
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
    this.top = y || 0
    this.right = this.x + this.width
    this.bottom = this.y + this.height
    this.left = x || 0
  }
}

export class Rectangle {
  static center(rect: Rect): Point {
    return {
      x: (rect.left + rect.right) / 2,
      y: (rect.bottom + rect.top) / 2,
    }
  }

  static contains(rect: Rect, point: Point): boolean {
    return (
      point.x >= rect.left &&
      point.x <= rect.right &&
      point.y >= rect.top &&
      point.y <= rect.bottom
    )
  }

  static shrink(rect: Rect, amount: number): Rect {
    return {
      bottom: rect.bottom - amount,
      height: rect.height - 2 * amount,
      left: rect.left + amount,
      right: rect.right - amount,
      top: rect.top + amount,
      width: rect.width - 2 * amount,
      x: rect.x + amount,
      y: rect.y + amount,
    }
  }

  static zeroRect() {
    return new Rect(0, 0, 0, 0)
  }
}
