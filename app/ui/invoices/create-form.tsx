"use client";

import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createInvoice, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };

  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>

          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue=""
              required
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm"
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

            <UserCircleIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Error */}
        <div>
          {state.errors?.customerId?.map((error: string) => (
            <p key={error} className="text-red-500 text-sm">
              {error}
            </p>
          ))}
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
              required
              className="block w-full rounded-md border py-2 pl-10"
            />

            <CurrencyDollarIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Set status</legend>

          <div className="flex gap-4">
            <label>
              <input type="radio" name="status" value="pending" required />
              Pending <ClockIcon className="inline w-4" />
            </label>

            <label>
              <input type="radio" name="status" value="paid" required />
              Paid <CheckIcon className="inline w-4" />
            </label>
          </div>
        </fieldset>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Link href="/dashboard/invoices">Cancel</Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
