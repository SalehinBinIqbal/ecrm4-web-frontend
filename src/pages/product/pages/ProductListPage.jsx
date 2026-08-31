import { useMemo, useState } from "react";
import { ChevronDown, Package, Pencil, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { EmptyState } from "../../../components/ui/EmptyState";
import { PRODUCT_BRANDS } from "../data/mockProducts";
import { useHeaderSearch } from "../../../components/layout/HeaderSearchContext";

export function ProductListPage() {
  const [openBrand, setOpenBrand] = useState(PRODUCT_BRANDS[0]?.brand ?? null);
  const [search, setSearch] = useState("");

  const filteredBrands = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return PRODUCT_BRANDS;
    return PRODUCT_BRANDS.map((brand) => ({
      ...brand,
      skus: brand.brand.toLowerCase().includes(query)
        ? brand.skus
        : brand.skus.filter((sku) => sku.name.toLowerCase().includes(query)),
    })).filter((brand) => brand.skus.length > 0);
  }, [search]);

  useHeaderSearch({
    value: search,
    onChange: (value) => {
      setSearch(value);
    },
    placeholder: "Search products",
  });

  return (
    <div>
      <PageHeader title="Products" />

      {filteredBrands.length === 0 ? (
        <EmptyState message="No products match your search." />
      ) : (
        <div className="space-y-3">
          {filteredBrands.map((brand) => {
            const isOpen = search.trim() ? true : openBrand === brand.brand;
            return (
              <div
                key={brand.brand}
                className="bg-base-100 rounded-box border border-base-200 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenBrand(isOpen ? null : brand.brand)}
                  className="w-full flex items-center gap-3 px-6 py-4"
                >
                  <span className="font-semibold flex-1 text-left">
                    {brand.brand}
                  </span>
                  <span className="badge badge-soft badge-sm">
                    {brand.skus.length} SKUs
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-base-content/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                      type="button"
                      className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-dashed border-base-300 text-base-content/45 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors min-h-47.5"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-base-200">
                        <Plus className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium">
                        Create New SKU
                      </span>
                    </button>

                    {brand.skus.map((sku) => (
                      <div
                        key={sku.id}
                        className="rounded-2xl border border-base-200 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-base-200/70 text-base-content/35">
                            <Package className="h-6 w-6" />
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="btn btn-ghost btn-xs btn-circle"
                              aria-label="Edit SKU"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost btn-xs btn-circle text-error"
                              aria-label="Delete SKU"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-3.5">
                          <StatusBadge
                            status={
                              sku.available ? "Available" : "Not Available"
                            }
                          />
                          <p className="font-semibold mt-1.5">{sku.name}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3 gap-y-3 mt-4 pt-4 border-t border-base-200 text-sm">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                              Case Size
                            </p>
                            <p className="font-medium mt-0.5">{sku.caseSize}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                              Trade Price
                            </p>
                            <p className="font-medium mt-0.5">
                              BDT {sku.tradePrice.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                              MRP
                            </p>
                            <p className="font-medium mt-0.5">
                              BDT {sku.mrp.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                              VAT
                            </p>
                            <p className="font-medium mt-0.5">
                              BDT {sku.vat.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
