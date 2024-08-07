import type { FC, CSSProperties } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

import { useClickOutSide, useToggle } from "../../hooks";
import { eventHandler } from "../../functions";
import { useModalContext } from "./_modal.context";
import { ModalProvider } from "./_modal.provider";
import * as styles from "./styles.css";
import type {
  ModalContextProps,
  ModalProviderProps,
  ModalPortalProps,
  ModalLayoutProps,
  ModalTriggerProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalAllProps,
} from "./index.type";

export interface IModal extends ModalAllProps {}
// Modal's Container
const ModalContainer: FC<ModalProviderProps> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useToggle();
  return (
    <ModalProvider isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      {children}
    </ModalProvider>
  );
};

// ModalContainer.propTypes = {
//   children: PropTypes.node,
// };

// Modal's Portal
const ModalPortal: FC<ModalPortalProps> = ({ modalId = "root-modal", style, children, ...rest }) => {
  const container = document.getElementById(modalId);
  if (container === null) return null;

  return createPortal(children, container);
};

// ModalPortal.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   children: PropTypes.node,
// };

// Modal's Layout
const ModalLayout: FC<ModalLayoutProps> = ({ layoutStyle = undefined, dimmedStyle = undefined, children, ...rest }) => {
  const context = useModalContext();
  const ref = useClickOutSide<HTMLDivElement, ModalContextProps>(context.onClose, context);

  /**
   * @description static-change style depending on the Props
   */
  const staticDimmedStyle = [styles.dimmed];
  const staticLayoutStyle = [styles.layout];
  /**
   * @description dynamic-change style depending on the Props
   */
  const dynamicDimmedStyle: CSSProperties = { ...dimmedStyle };
  const dynamicLayoutStyle: CSSProperties = { ...layoutStyle };

  /**
   * @description classNames for static-change style
   */
  const dimmedCn = clsx("dimmed", ...staticDimmedStyle);
  const layoutCn = clsx("modal__layout", ...staticLayoutStyle);
  return (
    <div className={dimmedCn} style={dynamicDimmedStyle}>
      <div ref={ref} className={layoutCn} style={dynamicLayoutStyle} {...rest}>
        {children}
      </div>
    </div>
  );
};

// ModalLayout.propTypes = {
//   dimmedStyle: PropTypes.object,
//   layoutStyle: PropTypes.object,
//   children: PropTypes.node,
// };

// Modal's Trigger
const ModalTrigger: FC<ModalTriggerProps> = ({ className = "", onClick = undefined, style, children, ...rest }) => {
  const { isOpen, onOpen, onClose } = useModalContext();

  const onToggle = () => (isOpen ? onClose() : onOpen());

  /**
   * @description static-change style depending on the Props
   */
  const staticStyle = [styles.trigger];

  /**
   * @description dynamic-change style depending on the Props
   */
  const dynamicStyle: CSSProperties = { ...style };

  /**
   * @description classNames for static-change style
   */
  const classNames = clsx(...staticStyle, className);

  return (
    <button className={classNames} onClick={(e) => eventHandler.funcExecuteChecker(onClick, e, onToggle)} style={dynamicStyle} {...rest}>
      {children}
    </button>
  );
};
// ModalTrigger.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   children: PropTypes.node,
// };

// Modal's Header
const ModalHeader: FC<ModalHeaderProps> = ({ className = "", style, children, ...rest }) => {
  /**
   * @description static-change style depending on the Props
   */
  const staticStyle = [styles.header];

  /**
   * @description dynamic-change style depending on the Props
   */
  const dynamicStyle: CSSProperties = { ...style };

  /**
   * @description classNames for static-change style
   */
  const classNames = clsx(...staticStyle, className);
  return (
    <div className={classNames} style={dynamicStyle} {...rest}>
      {children}
    </div>
  );
};
// ModalHeader.propTypes = {
//   style: PropTypes.object,
//   children: PropTypes.node,
// };

// Modal's Body
const ModalBody: FC<ModalBodyProps> = ({ className = "", style, children, ...rest }) => {
  /**
   * @description static-change style depending on the Props
   */
  const staticStyle = [styles.body];

  /**
   * @description dynamic-change style depending on the Props
   */
  const dynamicStyle: CSSProperties = { ...style };

  /**
   * @description classNames for static-change style
   */
  const classNames = clsx(...staticStyle, className);

  return (
    <div className={classNames} style={dynamicStyle} {...rest}>
      {children}
    </div>
  );
};
// ModalBody.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   children: PropTypes.node,
// };
// Modal's Footer
const ModalFooter: FC<ModalFooterProps> = ({ className = "", style, children, ...rest }) => {
  /**
   * @description static-change style depending on the Props
   */
  const staticStyle = [styles.footer];

  /**
   * @description dynamic-change style depending on the Props
   */
  const dynamicStyle: CSSProperties = { ...style };

  /**
   * @description classNames for static-change style
   */
  const classNames = clsx(...staticStyle, className);
  return (
    <div className={classNames} style={dynamicStyle} {...rest}>
      {children}
    </div>
  );
};
// ModalFooter.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   children: PropTypes.node,
// };
const Modal = Object.assign(ModalContainer, {
  Portal: ModalPortal,
  Layout: ModalLayout,
  Trigger: ModalTrigger,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
export default Modal;
