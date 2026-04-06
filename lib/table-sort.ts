export type SortDirection = "asc" | "desc";

export type SortState<TKey extends string> =
  | {
      key: TKey;
      direction: SortDirection;
    }
  | null;

export type SortableValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

export function getNextSortState<TKey extends string>(
  current: SortState<TKey>,
  key: TKey,
): SortState<TKey> {
  if (!current || current.key !== key) {
    return { key, direction: "asc" };
  }

  if (current.direction === "asc") {
    return { key, direction: "desc" };
  }

  return null;
}

function isDateLikeValue(value: SortableValue): value is string | number | Date {
  return (
    value instanceof Date ||
    typeof value === "string" ||
    typeof value === "number"
  );
}

function compareDefinedValues(
  a: Exclude<SortableValue, null | undefined>,
  b: Exclude<SortableValue, null | undefined>,
) {
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  if (typeof a === "boolean" && typeof b === "boolean") {
    return Number(a) - Number(b);
  }

  if (isDateLikeValue(a) && isDateLikeValue(b)) {
    const aTime = new Date(a).getTime();
    const bTime = new Date(b).getTime();

    if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
      return aTime - bTime;
    }
  }

  return String(a).localeCompare(String(b), "id-ID", {
    numeric: true,
    sensitivity: "base",
  });
}

export function sortRows<TRow, TKey extends string>(
  rows: TRow[],
  sortState: SortState<TKey>,
  getters: Record<TKey, (row: TRow) => SortableValue>,
): TRow[] {
  if (!sortState) {
    return rows;
  }

  const getter = getters[sortState.key];
  const directionMultiplier = sortState.direction === "asc" ? 1 : -1;

  return [...rows].sort((left, right) => {
    const leftValue = getter(left);
    const rightValue = getter(right);

    const leftEmpty =
      leftValue === null || leftValue === undefined || leftValue === "";
    const rightEmpty =
      rightValue === null || rightValue === undefined || rightValue === "";

    if (leftEmpty && rightEmpty) {
      return 0;
    }

    if (leftEmpty) {
      return 1;
    }

    if (rightEmpty) {
      return -1;
    }

    return compareDefinedValues(leftValue, rightValue) * directionMultiplier;
  });
}