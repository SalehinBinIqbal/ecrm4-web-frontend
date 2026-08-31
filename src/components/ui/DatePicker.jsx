import { useEffect, useId, useRef } from "react";
import { ArrowRight, Calendar, X } from "lucide-react";

function NavIcons() {
  return (
    <>
      <svg
        aria-label="Previous"
        className="fill-current size-4"
        slot="previous"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
      </svg>
      <svg
        aria-label="Next"
        className="fill-current size-4"
        slot="next"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
      </svg>
    </>
  );
}

function ClearButton({ onClear }) {
  return (
    <X
      aria-label="Clear"
      className="size-3.5 shrink-0 text-base-content/40 hover:text-base-content hidden group-hover:block"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClear();
      }}
    />
  );
}

const YEAR_SELECT_CLASSES =
  "[&::part(label)]:sr-only " +
  "[&::part(select)]:select [&::part(select)]:select-bordered [&::part(select)]:select-xs " +
  "[&::part(select)]:h-7 [&::part(select)]:min-h-0 [&::part(select)]:pl-3 [&::part(select)]:pr-3 " +
  "[&::part(select)]:appearance-none [&::part(select)]:bg-none " +
  "[&::part(select)]:font-semibold [&::part(select)]:text-base-content [&::part(select)]:rounded-full";

const PANEL_CLASSES =
  "dropdown bg-base-100 border border-base-300 rounded-box shadow-xl p-3 " +
  "max-w-[calc(100vw-2rem)] overflow-x-auto " +
  "[&_calendar-month::part(day)]:rounded-full [&_calendar-month::part(day)]:transition-colors " +
  "[&_calendar-month::part(today)]:ring-1 [&_calendar-month::part(today)]:ring-primary/50 " +
  "[&_calendar-month::part(today)]:ring-inset [&_calendar-month::part(today)]:font-semibold";

function useAnchorIds(prefix) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  return {
    anchorName: `--${prefix}-${rawId}`,
    popoverId: `${prefix}-popover-${rawId}`,
  };
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
  min,
  max,
  disabled = false,
}) {
  const { anchorName, popoverId } = useAnchorIds("cally");
  const calendarRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    const el = calendarRef.current;
    if (!el) return;
    function handleChange(event) {
      onChange?.(event.target.value);
      popoverRef.current?.hidePopover();
    }
    el.addEventListener("change", handleChange);
    return () => el.removeEventListener("change", handleChange);
  }, [onChange]);

  return (
    <>
      <button
        type="button"
        popoverTarget={popoverId}
        disabled={disabled}
        style={{ anchorName }}
        className={`input input-bordered w-full flex items-center gap-2 group ${className}`.trim()}
      >
        <span
          className={`flex-1 min-w-0 text-left truncate ${value ? "" : "text-base-content/40"}`}
        >
          {value || placeholder}
        </span>
        {value && <ClearButton onClear={() => onChange?.("")} />}
        <Calendar
          className={`size-3.5 shrink-0 text-base-content/40 ${value ? "group-hover:hidden" : ""}`}
        />
      </button>
      <div
        popover="auto"
        id={popoverId}
        ref={popoverRef}
        className={PANEL_CLASSES}
        style={{ positionAnchor: anchorName }}
      >
        <calendar-date
          ref={calendarRef}
          className="cally"
          value={value || undefined}
          min={min}
          max={max}
        >
          <calendar-select-year
            slot="heading"
            max-years="12"
            className={YEAR_SELECT_CLASSES}
          ></calendar-select-year>
          <NavIcons />
          <calendar-month></calendar-month>
        </calendar-date>
        <div className="flex justify-center border-t border-base-200 mt-2 pt-2">
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => {
              onChange?.(todayIso());
              popoverRef.current?.hidePopover();
            }}
          >
            Today
          </button>
        </div>
      </div>
    </>
  );
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  placeholder = "Select date range",
  className = "",
  min,
  max,
  disabled = false,
}) {
  const { anchorName, popoverId } = useAnchorIds("cally-range");
  const calendarRef = useRef(null);
  const popoverRef = useRef(null);
  const hasValue = Boolean(startDate && endDate);
  const value = hasValue ? `${startDate}/${endDate}` : "";

  useEffect(() => {
    const el = calendarRef.current;
    if (!el) return;
    function handleChange(event) {
      const [start, end] = event.target.value.split("/");
      onChange?.(start ?? "", end ?? "");
      if (start && end) popoverRef.current?.hidePopover();
    }
    el.addEventListener("change", handleChange);
    return () => el.removeEventListener("change", handleChange);
  }, [onChange]);

  return (
    <>
      <button
        type="button"
        popoverTarget={popoverId}
        disabled={disabled}
        style={{ anchorName }}
        className={`input input-bordered w-full flex items-center gap-2 group ${className}`.trim()}
      >
        <span
          className={`flex-1 min-w-0 flex items-center gap-2 text-left truncate ${hasValue ? "" : "text-base-content/40"}`}
        >
          {hasValue ? (
            <>
              <span className="truncate">{startDate}</span>
              <ArrowRight className="size-3 shrink-0 text-base-content/30" />
              <span className="truncate">{endDate}</span>
            </>
          ) : (
            placeholder
          )}
        </span>
        {hasValue && <ClearButton onClear={() => onChange?.("", "")} />}
        <Calendar
          className={`size-3.5 shrink-0 text-base-content/40 ${hasValue ? "group-hover:hidden" : ""}`}
        />
      </button>
      <div
        popover="auto"
        id={popoverId}
        ref={popoverRef}
        className={PANEL_CLASSES}
        style={{ positionAnchor: anchorName }}
      >
        <calendar-range
          ref={calendarRef}
          className="cally"
          value={value || undefined}
          min={min}
          max={max}
          months={2}
        >
          <calendar-select-year
            slot="heading"
            max-years="12"
            className={YEAR_SELECT_CLASSES}
          ></calendar-select-year>
          <NavIcons />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
            <calendar-month></calendar-month>
            <div className="divider sm:divider-horizontal my-0 sm:my-0"></div>
            <calendar-month offset={1}></calendar-month>
          </div>
        </calendar-range>
      </div>
    </>
  );
}
