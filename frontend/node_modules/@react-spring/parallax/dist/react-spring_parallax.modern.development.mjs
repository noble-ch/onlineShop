// src/index.tsx
import * as React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { useMemoOne, useOnce, raf } from "@react-spring/shared";
import {
  a,
  Controller,
  config as configs
} from "@react-spring/web";
var ParentContext = React.createContext(null);
function getScrollType(horizontal) {
  return horizontal ? "scrollLeft" : "scrollTop";
}
function mapChildrenRecursive(children, callback) {
  const isReactFragment = (node) => {
    if (node.type) {
      return node.type === React.Fragment;
    }
    return node === React.Fragment;
  };
  return React.Children.map(
    children,
    (child) => isReactFragment(child) ? mapChildrenRecursive(child.props.children, callback) : callback(child)
  );
}
var START_TRANSLATE_3D = "translate3d(0px,0px,0px)";
var START_TRANSLATE = "translate(0px,0px)";
var ParallaxLayer = React.memo(
  React.forwardRef(
    ({ horizontal, factor = 1, offset = 0, speed = 0, sticky, ...rest }, ref) => {
      const parent = useContext(ParentContext);
      const ctrl = useMemoOne(() => {
        let translate;
        if (sticky) {
          const start = sticky.start || 0;
          translate = start * parent.space;
        } else {
          const targetScroll = Math.floor(offset) * parent.space;
          const distance = parent.space * offset + targetScroll * speed;
          translate = -(parent.current * speed) + distance;
        }
        return new Controller({
          space: sticky ? parent.space : parent.space * factor,
          translate
        });
      }, []);
      const layer = useMemoOne(
        () => ({
          horizontal: horizontal === void 0 || sticky ? parent.horizontal : horizontal,
          sticky: void 0,
          isSticky: false,
          setPosition(height, scrollTop, immediate = false) {
            if (sticky) {
              setSticky(height, scrollTop);
            } else {
              const targetScroll = Math.floor(offset) * height;
              const distance = height * offset + targetScroll * speed;
              ctrl.start({
                translate: -(scrollTop * speed) + distance,
                config: parent.config,
                immediate
              });
            }
          },
          setHeight(height, immediate = false) {
            ctrl.start({
              space: sticky ? height : height * factor,
              config: parent.config,
              immediate
            });
          }
        }),
        []
      );
      useOnce(() => {
        if (sticky) {
          const start = sticky.start || 0;
          const end = sticky.end || start + 1;
          layer.sticky = { start, end };
        }
      });
      React.useImperativeHandle(ref, () => layer);
      const layerRef = useRef();
      const setSticky = (height, scrollTop) => {
        const start = layer.sticky.start * height;
        const end = layer.sticky.end * height;
        const isSticky = scrollTop >= start && scrollTop <= end;
        if (isSticky === layer.isSticky)
          return;
        layer.isSticky = isSticky;
        const ref2 = layerRef.current;
        ref2.style.position = isSticky ? "sticky" : "absolute";
        ctrl.set({
          translate: isSticky ? 0 : scrollTop < start ? start : end
        });
      };
      useOnce(() => {
        if (parent) {
          parent.layers.add(layer);
          parent.update();
          return () => {
            parent.layers.delete(layer);
            parent.update();
          };
        }
      });
      const translate3d = ctrl.springs.translate.to(
        layer.horizontal ? (x) => `translate3d(${x}px,0,0)` : (y) => `translate3d(0,${y}px,0)`
      );
      return /* @__PURE__ */ React.createElement(
        a.div,
        {
          ...rest,
          ref: layerRef,
          style: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            willChange: "transform",
            [layer.horizontal ? "height" : "width"]: "100%",
            [layer.horizontal ? "width" : "height"]: ctrl.springs.space,
            WebkitTransform: translate3d,
            msTransform: translate3d,
            transform: translate3d,
            ...rest.style
          }
        }
      );
    }
  )
);
var Parallax = React.memo(
  React.forwardRef((props, ref) => {
    const [ready, setReady] = useState(false);
    const {
      pages,
      innerStyle: _innerStyle,
      config = configs.slow,
      enabled = true,
      horizontal = false,
      children,
      ...rest
    } = props;
    const containerRef = useRef();
    const contentRef = useRef();
    const state = useMemoOne(
      () => ({
        config,
        horizontal,
        busy: false,
        space: 0,
        current: 0,
        offset: 0,
        controller: new Controller({ scroll: 0 }),
        layers: /* @__PURE__ */ new Set(),
        container: containerRef,
        content: contentRef,
        update: () => update(),
        scrollTo: (offset) => scrollTo(offset),
        stop: () => state.controller.stop()
      }),
      []
    );
    useEffect(() => {
      state.config = config;
    }, [config]);
    React.useImperativeHandle(ref, () => state);
    const update = () => {
      const container = containerRef.current;
      if (!container)
        return;
      const spaceProp = horizontal ? "clientWidth" : "clientHeight";
      state.space = container[spaceProp];
      const scrollType = getScrollType(horizontal);
      if (enabled) {
        state.current = container[scrollType];
      } else {
        container[scrollType] = state.current = state.offset * state.space;
      }
      const content = contentRef.current;
      if (content) {
        const sizeProp = horizontal ? "width" : "height";
        content.style[sizeProp] = `${state.space * pages}px`;
      }
      state.layers.forEach((layer) => {
        layer.setHeight(state.space, true);
        layer.setPosition(state.space, state.current, true);
      });
    };
    const scrollTo = (offset) => {
      const container = containerRef.current;
      const scrollType = getScrollType(horizontal);
      state.offset = offset;
      state.controller.set({ scroll: state.current });
      state.controller.stop().start({
        scroll: offset * state.space,
        config,
        onChange({ value: { scroll } }) {
          container[scrollType] = scroll;
        }
      });
    };
    const onScroll = (event) => {
      if (!state.busy) {
        state.busy = true;
        state.current = event.target[getScrollType(horizontal)];
        raf.onStart(() => {
          state.layers.forEach(
            (layer) => layer.setPosition(state.space, state.current)
          );
          state.busy = false;
        });
      }
    };
    useEffect(() => state.update());
    useOnce(() => {
      setReady(true);
      const onResize = () => {
        const update2 = () => state.update();
        raf.onFrame(update2);
        setTimeout(update2, 150);
      };
      window.addEventListener("resize", onResize, false);
      return () => window.removeEventListener("resize", onResize, false);
    });
    const overflow = enabled ? {
      overflowY: horizontal ? "hidden" : "scroll",
      overflowX: horizontal ? "scroll" : "hidden"
    } : {
      overflowY: "hidden",
      overflowX: "hidden"
    };
    return /* @__PURE__ */ React.createElement(
      a.div,
      {
        ...rest,
        ref: containerRef,
        onScroll,
        onWheel: enabled ? state.stop : void 0,
        onTouchStart: enabled ? state.stop : void 0,
        style: {
          position: "absolute",
          width: "100%",
          height: "100%",
          ...overflow,
          WebkitOverflowScrolling: "touch",
          WebkitTransform: START_TRANSLATE,
          msTransform: START_TRANSLATE,
          transform: START_TRANSLATE_3D,
          ...rest.style
        }
      },
      ready && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
        a.div,
        {
          ref: contentRef,
          style: {
            overflow: "hidden",
            position: "absolute",
            [horizontal ? "height" : "width"]: "100%",
            [horizontal ? "width" : "height"]: state.space * pages,
            WebkitTransform: START_TRANSLATE,
            msTransform: START_TRANSLATE,
            transform: START_TRANSLATE_3D,
            ...props.innerStyle
          }
        },
        /* @__PURE__ */ React.createElement(ParentContext.Provider, { value: state }, mapChildrenRecursive(
          children,
          (child) => !child.props.sticky && child
        ))
      ), /* @__PURE__ */ React.createElement(ParentContext.Provider, { value: state }, mapChildrenRecursive(
        children,
        (child) => child.props.sticky && child
      )))
    );
  })
);
export {
  Parallax,
  ParallaxLayer
};
//# sourceMappingURL=react-spring_parallax.modern.development.mjs.map