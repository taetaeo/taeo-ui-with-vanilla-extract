import type { ReactNode, FC, CSSProperties, Ref } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import type { SpacingProps } from "./index.type";
import * as styles from "./styles.css";

export interface ISpacing extends SpacingProps {
  style?: CSSProperties;
  children: ReactNode;
}

const Spacing: FC<SpacingProps> = React.forwardRef(function Index(
  { className = "spacing", size = "none", style, children, ...rest },
  forwardedRef: Ref<HTMLElement>
) {
  /**
   * @description static-change style depending on the Props
   */
  const staticStyle = [styles.baseSpacing, styles.spacing[size]];

  /**
   * @description dynamic-change style depending on the Props
   */
  const dynamicStyle: CSSProperties = { ...style };

  /**
   * @description classNames for static-change style
   */
  const classNames: string = clsx(...staticStyle);
  return (
    <span ref={forwardedRef} className={classNames} style={dynamicStyle} {...rest}>
      {children}
    </span>
  );
});

// Spacing.propTypes = {
//   className: PropTypes.string,
//   size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
//   style: PropTypes.object,
//   children: PropTypes.node,
// };

export default Spacing;
