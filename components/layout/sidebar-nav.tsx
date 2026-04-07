"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  getNavigationItems,
  hasActiveNavigationChildren,
  isActiveNavigationItem,
  navigationChildIcons,
  type AppUserRole,
  type NavigationChildItem,
  type NavigationItem,
} from "@/components/layout/navigation-config";
import type { ResolvedRolePermission } from "@/lib/permissions";

function SidebarChildLink({
  child,
  pathname,
}: {
  child: NavigationChildItem;
  pathname: string;
}) {
  const active = isActiveNavigationItem(pathname, child.href);
  const ChildIcon =
    child.href.includes("/input") || child.href.includes("/input-data")
      ? navigationChildIcons.input
      : navigationChildIcons.list;

  return (
    <Link
      href={child.href}
      className={cn(
        "group flex items-center gap-2.5 rounded-xl border px-3 py-2 text-[13px] font-medium transition-all",
        active
          ? "border-sky-300/16 bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(37,99,235,0.08))] text-slate-50 shadow-[0_18px_30px_-24px_rgba(59,130,246,0.28)]"
          : "border-white/6 bg-white/3 text-slate-300 hover:border-slate-300/15 hover:bg-white/6 hover:text-slate-50",
      )}
    >
      <ChildIcon
        className={cn(
          "h-3.5 w-3.5 shrink-0",
          active
            ? "text-sky-100"
            : "text-slate-400 group-hover:text-slate-200",
        )}
      />
      <span className="truncate">{child.label}</span>
    </Link>
  );
}

function SidebarLinkItem({
  item,
  pathname,
  isMobile,
}: {
  item: NavigationItem;
  pathname: string;
  isMobile: boolean;
}) {
  const Icon = item.icon;
  const active = isActiveNavigationItem(pathname, item.href);

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-[1.1rem] border px-3.5 py-2.5 text-[14px] font-medium transition-all",
        active
          ? "border-sky-300/16 bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(37,99,235,0.08))] text-slate-50 shadow-[0_20px_34px_-26px_rgba(59,130,246,0.3)]"
          : "border-white/7 bg-white/4 text-slate-300 hover:border-slate-300/15 hover:bg-white/7 hover:text-slate-50",
      )}
    >
      <span
        className={cn(
          isMobile
            ? "inline-flex h-8 w-8 items-center justify-center rounded-xl border transition-all"
            : "inline-flex h-9 w-9 items-center justify-center rounded-[0.95rem] border transition-all",
          active
            ? "border-sky-300/16 bg-sky-400/12 text-sky-100 shadow-[0_12px_24px_-16px_rgba(59,130,246,0.28)]"
            : "border-white/10 bg-white/4 text-slate-400 group-hover:text-slate-200",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>

      <span className="truncate">{isMobile ? item.shortLabel : item.label}</span>
    </Link>
  );
}

function SidebarDropdownItem({
  item,
  pathname,
  isMobile,
}: {
  item: NavigationItem;
  pathname: string;
  isMobile: boolean;
}) {
  const Icon = item.icon;
  const ChevronIcon = navigationChildIcons.chevron;
  const activeChild = hasActiveNavigationChildren(pathname, item);
  const activeParent = isActiveNavigationItem(pathname, item.href);
  const [open, setOpen] = useState(activeChild || activeParent);

  return (
    <div
      className={cn(
        "rounded-[1.25rem] border transition-all",
        activeChild || activeParent || open
          ? "border-sky-300/14 bg-[linear-gradient(180deg,rgba(16,34,70,0.88),rgba(10,24,52,0.8))] shadow-[0_22px_40px_-30px_rgba(59,130,246,0.18)]"
          : "border-white/7 bg-white/4",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "group flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-[14px] font-medium transition-all",
          activeChild || activeParent || open
            ? "text-slate-50"
            : "text-slate-300 hover:text-slate-50",
        )}
        aria-expanded={open}
        aria-label={`Toggle submenu ${item.label}`}
      >
        <span
          className={cn(
            isMobile
              ? "inline-flex h-8 w-8 items-center justify-center rounded-xl border transition-all"
              : "inline-flex h-9 w-9 items-center justify-center rounded-[0.95rem] border transition-all",
            activeChild || activeParent || open
              ? "border-sky-300/16 bg-sky-400/12 text-sky-100"
              : "border-white/10 bg-white/4 text-slate-400 group-hover:text-slate-200",
          )}
        >
          <Icon className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate">{isMobile ? item.shortLabel : item.label}</p>
        </div>

        <ChevronIcon
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            open ? "rotate-90 text-sky-100" : "text-slate-400",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="ml-5 space-y-2 border-l border-white/8 px-3 pb-3">
            {item.children?.map((child) => (
              <SidebarChildLink
                key={child.href}
                child={child}
                pathname={pathname}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarNav({
  role,
  pathname,
  permission,
  variant = "desktop",
}: {
  role: AppUserRole;
  pathname: string;
  permission: ResolvedRolePermission;
  variant?: "desktop" | "mobile";
}) {
  const items = getNavigationItems(role, permission);
  const isMobile = variant === "mobile";

  return (
    <nav className={isMobile ? "mobile-nav-shell space-y-2" : "space-y-2.5"}>
      {items.map((item) =>
        item.children?.length ? (
          <SidebarDropdownItem
            key={item.href}
            item={item}
            pathname={pathname}
            isMobile={isMobile}
          />
        ) : (
          <SidebarLinkItem
            key={item.href}
            item={item}
            pathname={pathname}
            isMobile={isMobile}
          />
        ),
      )}
    </nav>
  );
}