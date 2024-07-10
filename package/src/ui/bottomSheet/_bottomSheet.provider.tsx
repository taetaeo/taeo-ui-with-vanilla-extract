import type { PropsWithChildren } from "react";

import { BottomSheetContext } from "./_bottomSheet.context";
import { useBottomSheetController } from "./_bottomSheet.controller";

/**
 *
 * @param {FC<PropsWithChildren>} param BottomSheet Provider의 Props
 * @returns {React.Context<ContextProps>} Provider
 */
export const BottomSheetProvider = ({ children }: PropsWithChildren) => {
  const { onDragEnd, controls, setIsOpen, isOpen } = useBottomSheetController();

  return <BottomSheetContext.Provider value={{ onDragEnd, controls, setIsOpen, isOpen }}>{children}</BottomSheetContext.Provider>;
};
