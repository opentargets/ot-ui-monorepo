import { createContext, useContext, useReducer, Dispatch, ReactElement, useEffect } from "react";

type FocusElementTable = "body" | "pinned" | "upload";

export type FocusElement = {
  table: FocusElementTable;
  row: string;
  interactorsRow: string | null;
  interactorsView: string | null;
  interactors: boolean;
  section: null | [string, string];
  interactorsSection: null | [string, string];
};
const defaultFocusElement: FocusElement = {
  table: "body",
  row: "",
  interactors: false,
  interactorsRow: null,
  interactorsView: null,
  section: null,
  interactorsSection: null,
};

export type FocusState = FocusElement[];

export enum FocusActionType {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  RESET = "RESET",
  SET_INTERACTORS_SECTION = "SET_INTERACTORS_SECTION",
  SET_INTERACTORS_ON = "SET_INTERACTORS_ON",
  SET_FOCUS_SECTION = "SET_FOCUS_SECTION",
}

export type FocusAction =
  | { type: FocusActionType.ADD; focusElement: FocusElement }
  | { type: FocusActionType.UPDATE; focusElement: FocusElement }
  | { type: FocusActionType.DELETE; focusElement: FocusElement }
  | { type: FocusActionType.SET_INTERACTORS_ON; focus: { row: string; table: FocusElementTable } }
  | {
      type: FocusActionType.SET_INTERACTORS_SECTION;
      focus: {
        row: string;
        table: FocusElementTable;
        section: [string, string];
        interactorsRow: string;
      };
    }
  | {
      type: FocusActionType.SET_FOCUS_SECTION;
      focus: { row: string; table: FocusElementTable; section: [string, string] };
    }
  | { type: FocusActionType.RESET };

const AssociationsFocusContext = createContext<FocusState>([]);

const AssociationsFocusDispatchContext = createContext<Dispatch<FocusAction>>(_ => _);

const getFocusElementState = (
  state: FocusState,
  {
    table,
    row,
    section,
  }: { table: FocusElementTable; row: string; section: [string, string] | null }
) => {
  let sectionActive = false;
  let rowActive = false;
  let tableActive = false;
  state.forEach((el: FocusElement) => {
    if (!tableActive && el.table === table) {
      tableActive = true;
    }
    if (el.row === row && el.table === table) {
      rowActive = true;
      if (el.section?.join("-") === section?.join("-")) {
        sectionActive = true;
        return { sectionActive, rowActive, tableActive };
      }
    }
  });

  return { sectionActive, rowActive, tableActive };
};

const focusElementGenerator = (
  table: FocusElementTable,
  row: string,
  section: [string, string] | null,
  interactorsView: null | string,
  interactors = false
): FocusElement => {
  return { ...defaultFocusElement, table, row, section: section, interactors, interactorsView };
};

function focusReducer(focusState: FocusState, action: FocusAction): FocusState {
  switch (action.type) {
    case FocusActionType.SET_FOCUS_SECTION: {
      const { tableActive, rowActive, sectionActive } = getFocusElementState(focusState, {
        table: action.focus.table,
        row: action.focus.row,
        section: action.focus.section,
      });
      console.log(action, focusState);
      if (!tableActive) {
        return [
          ...focusState,
          focusElementGenerator(action.focus.table, action.focus.row, action.focus.section, null),
        ];
      }
      if (!rowActive && !sectionActive) {
        console.log("wcfeds");
        const focusElement = focusState.find(
          e => e.table === action.focus.table && e.section !== null
        );
        if (focusElement === undefined) {
          return [
            ...focusState,
            focusElementGenerator(action.focus.table, action.focus.row, action.focus.section, null),
          ];
        }
        return focusState.map((focusElement: FocusElement) => {
          if (focusElement.table === action.focus.table && focusElement.section !== null) {
            return focusElementGenerator(
              action.focus.table,
              action.focus.row,
              action.focus.section,
              null
            );
          } else {
            return focusElement;
          }
        });
        return [
          ...focusState,
          focusElementGenerator(action.focus.table, action.focus.row, action.focus.section, null),
        ];
        // const focusElement = focusState.find(
        //   e => e.table === action.focus.table && e.row === action.focus.row
        // );
        // return focusState.map((focusElement: FocusElement) => {
        //   if (focusElement.table === action.focus.table && focusElement.section !== null) {
        //     return focusElementGenerator(
        //       action.focus.table,
        //       action.focus.row,
        //       action.focus.section,
        //       null
        //     );
        //   } else {
        //     return focusElement;
        //   }
        // });
      }

      if (rowActive && !sectionActive) {
        console.log("wcfe");
        return focusState.map((focusElement: FocusElement) => {
          if (focusElement.table === action.focus.table && focusElement.row === action.focus.row) {
            return { ...focusElement, section: action.focus.section };
          } else {
            return focusElement;
          }
        });
      }

      if (tableActive && rowActive && sectionActive) {
        const focusElement = focusState.find(
          e => e.table === action.focus.table && e.row === action.focus.row
        );
        if (focusElement?.interactors) {
          return focusState.map((e: FocusElement) => {
            if (e.table === action.focus.table && e.row === action.focus.row) {
              return { ...e, section: null };
            } else {
              return e;
            }
          });
        }
        return focusState.filter(
          (focusElement: FocusElement) =>
            focusElement.row !== action.focus.row || focusElement.table !== action.focus.table
        );
      }

      return focusState;
    }

    case FocusActionType.SET_INTERACTORS_ON:
      {
        const { rowActive } = getFocusElementState(focusState, {
          table: action.focus.table,
          row: action.focus.row,
          section: null,
        });
        if (rowActive) {
          return focusState.map((focusElement: FocusElement) => {
            if (
              focusElement.row === action.focus.row &&
              focusElement.table === action.focus.table
            ) {
              return {
                ...focusElement,
                interactors: true,
                interactorsView: "intac",
              };
            } else {
              return focusElement;
            }
          });
        }
      }

      return [
        ...focusState,
        focusElementGenerator(action.focus.table, action.focus.row, null, "intac", true),
      ];

    case FocusActionType.SET_INTERACTORS_SECTION: {
      const focusElement = focusState.find(
        e => e.table === action.focus.table && e.row === action.focus.row
      );
      if (focusElement?.interactors) {
        return focusState.map((e: FocusElement) => {
          if (
            e.table === action.focus.table &&
            e.row === action.focus.row &&
            e.interactorsRow === action.focus.interactorsRow &&
            e.interactorsSection?.join("-") === action.focus.section?.join("-")
          ) {
            return { ...e, interactorsSection: null, interactorsRow: null };
          }
          if (e.table === action.focus.table && e.row === action.focus.row) {
            return {
              ...e,
              interactorsSection: action.focus.section,
              interactorsRow: action.focus.interactorsRow,
            };
          }

          return e;
        });
      }
      return focusState.filter(
        (focusElement: FocusElement) =>
          focusElement.row !== action.focus.row || focusElement.table !== action.focus.table
      );
      // const focusElement = focusState.find(
      //   e => e.table === action.focus.table && e.row === action.focus.row
      // );
      // return focusState.map((focusElement: FocusElement) => {
      //   if (focusElement.table === action.focus.table && focusElement.row === action.focus.row) {
      //     return {
      //       ...focusElement,
      //       interactorsView: "intac",
      //       interactorsSection: action.focus.section,
      //       interactorsRow: action.focus.interactorsRow,
      //     };
      //   } else {
      //     return focusElement;
      //   }
      // });
    }

    case FocusActionType.DELETE: {
      return focusState.filter(
        (focusElement: FocusElement) =>
          focusElement.row !== action.focusElement.row &&
          focusElement.table !== action.focusElement.table
      );
    }
    case FocusActionType.RESET: {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export function AssociationsFocusProvider({ children }: { children: ReactElement }): ReactElement {
  const [focusState, dispatch] = useReducer(focusReducer, []);

  useEffect(() => {
    console.log({ focusState });
  }, [focusState]);
  return (
    <AssociationsFocusContext.Provider value={focusState}>
      <AssociationsFocusDispatchContext.Provider value={dispatch}>
        {children}
      </AssociationsFocusDispatchContext.Provider>
    </AssociationsFocusContext.Provider>
  );
}

export function useAssociationsFocus(): FocusState {
  return useContext(AssociationsFocusContext);
}

export function useAssociationsFocusDispatch(): Dispatch<FocusAction> {
  return useContext(AssociationsFocusDispatchContext);
}
