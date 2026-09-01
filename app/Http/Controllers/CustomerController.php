<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::orderBy('updated_at', 'desc')->get()->map(function($customer) {
            return [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email ?? 'N/A',
                'phone' => $customer->phone ?? 'N/A',
                'totalBookings' => $customer->total_bookings,
                'status' => $customer->status,
            ];
        });

        return inertia('dashboard/customer', [
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|string',
        ]);

        Customer::create($validated);

        return redirect()->back()->with('success', 'Customer added successfully.');
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|string',
        ]);

        $customer->update($validated);

        return redirect()->back()->with('success', 'Customer updated successfully.');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->back()->with('success', 'Customer deleted successfully.');
    }
}
