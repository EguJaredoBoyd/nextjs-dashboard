"use client";

import { CustomerField, InvoiceForm } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateInvoice, State } from "@/app/lib/actions";
import { useActionState } from "react"; // ✅ FIX 1

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };

  // ✅ FIX 2: wrap function instead of bind
  const updateInvoiceWithId = async (prevState: State, formData: FormData) => {
    return updateInvoice(invoice.id, prevState, formData);
  };

  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Choose customer
          </label>

          <div className="relative">
            <select
              name="customerId"
              defaultValue={invoice.customer_id}
              className="block w-full border py-2 pl-10"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>

            <UserCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4" />
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>

          <div className="relative">
            <input
              name="amount"
              type="number"
              step="0.01"
              defaultValue={invoice.amount}
              className="block w-full border py-2 pl-10"
            />

            <CurrencyDollarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4" />
          </div>
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Set status</legend>

          <label>
            <input
              type="radio"
              name="status"
              value="pending"
              defaultChecked={invoice.status === "pending"}
            />
            Pending <ClockIcon className="inline w-4" />
          </label>

          <label>
            <input
              type="radio"
              name="status"
              value="paid"
              defaultChecked={invoice.status === "paid"}
            />
            Paid <CheckIcon className="inline w-4" />
          </label>
        </fieldset>
      </div>

      <div className="mt-6 flex gap-4">
        <Link href="/dashboard/invoices">Cancel</Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
