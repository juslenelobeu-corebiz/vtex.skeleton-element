# Skeleton Component Custom

Componente criado para encapsular blocos nativos da VTEX IO, exibindo um loading personalizado até que o `children` (_bloco nativo informado_) seja detectado no viewport.

## Descrição:
Nesse exemplo eu encapsulei os `children's` do `product-summary.shelf` no componente custom `skeleton`.

```json
"product-summary.shelf": {
    "children": [ "skeleton" ]
},
"skeleton": {
    "children": [ 
      "product-summary-image",
      "product-summary-brand",
      "product-summary-name",
      "product-list-price",
      "product-selling-price",
      "product-summary-space",
      "add-to-cart-button#shelf"
    ]
},
"product-summary-image": {
    "props": {
        "maxHeight": 380,
        "badgeText": "OFF",
        "hoverImage": {
            "criteria": "label",
            "label": "vitrine2"
        }
    }
},
"product-summary-name": {
    "props": {
        "tag": "h3"
    }
},
"add-to-cart-button#shelf": {
    "props": {
        "text": "Comprar"
    }
}
```
Informei no arquivo `interfaces.json`:
```json
"skeleton": {
  "component": "Skeleton",
  "composition": "children"
}
```
Como validação, utilizei o `hook` da VTEX IO, [useOnView]('https://github.com/vtex-apps/on-view'). 
```text
💡 Nele é possível informar uma referência e aplicar uma ação quando essa referência estiver visível no viewport
```
## Component Skeleton
```js
// index
import React, { useState, useRef } from 'react';
import SkeletonElement from './SkeletonElement';
import { useOnView } from 'vtex.on-view'

const Skeleton = ({ children }) => {
  const [ loading, setLoading ] = useState(true)
  const element = useRef(null)

  useOnView({
    ref: element,
    once: true,
    onView: () => {
      setLoading(false)
    },
  })

  return loading ? (
    <div ref={ element }>
      <SkeletonElement type="item" width="300px" height="auto">
        <SkeletonElement type="image" width="100%" height="300px"/>
        <SkeletonElement type="text" width="80%" height="15px"/>
        <SkeletonElement type="text" width="50%" height="10px"/>
      </SkeletonElement>
    </div>
  ) : <div ref={ element }>{ children }</div>

};

export default Skeleton;
```
Utilizei o `useRef` para referenciar no `return` os blocos que desejo exibir (`skeleton` e `children`), e para alternar entre eles, criei um estado de `loading` com valor inicial `true` e dentro do `hook` `useOnView` eu mudo o valor do estado `loading` para `false` quando existir o retorno do `children` no viewport.

## Component SkeletonElement

Para a estrutura do `loading skeleton` eu criei um componente passando `props` nos estilos inline e classes:
```js
// SkeletonElement
import React from 'react';
import './SkeletonElement.global.css'

const SkeletonElement = ({ type, width, height, children }) => {
  const classes = `skeleton ${ type }`
  const mystyle = {
    width: width,
    height: height
  };

  return (
    <div className={classes} style={mystyle}>{ children }</div>
  );
};

export default SkeletonElement;
```
Assim, quando chamar esse componente é possível informar o tipo, conforme os estinos no `css` e as medidas passando pelas `props`.

## Informações adicionais:

Para utilizar este `hook` da VTEX IO é necessário instalar a dependência:
```bash
vtex install vtex.on-view@1.x
```
E adicionar a linha no `manifest.json`
```json
"vtex.on-view": "1.x"
```