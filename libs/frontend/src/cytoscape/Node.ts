export class Node {
  public children: Array<Node> = []

  public addChild(child: Node) {
    this.children = [...this.children, child]
  }
}
