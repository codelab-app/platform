import type { Point } from './point'

export interface Rect {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

export class Rectangle {
  static center(rect: Rect): Point {
    return {
      x: (rect.left + rect.right) / 2,
      y: (rect.bottom + rect.top) / 2,
    }
  }

  static shrink(rect: Rect, amount: number): Rect {
    return {
      bottom: rect.bottom - amount,
      height: rect.height - 2 * amount,
      left: rect.left + amount,
      right: rect.right - amount,
      top: rect.top + amount,
      width: rect.width - 2 * amount,
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

  static zeroRect() {
    return { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 }
  }

  static createRect(left: number, top: number, width: number, height: number) {
    return {
      bottom: top + height,
      height,
      left,
      right: left + width,
      top,
      width,
    }
  }
}
