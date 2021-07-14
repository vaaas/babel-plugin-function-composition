'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true
})

const hasNoComposition = path => !!path.findParent(x =>
    x.node.directives &&
    x.node.directives.some(x => x.value.value === 'no composition')
)

exports.default = function (_ref3) {
    const t = _ref3.types
    return {
        visitor: {
            BinaryExpression(path) {
                if (!path.isBinaryExpression({ operator: '>>' }) || hasNoComposition(path))
                    return
                const lambda = t.arrowFunctionExpression([t.identifier('args')], t.callExpression(t.parenthesizedExpression(path.node.right), [t.callExpression(t.parenthesizedExpression(path.node.left), [t.identifier('args')])]))
                path.replaceWith(lambda)
            }
        }
    }
}
