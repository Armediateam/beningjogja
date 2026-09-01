<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        return inertia('dashboard/messages', [
            'messages' => $messages
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
    }

    public function update(Request $request, ContactMessage $contact_message)
    {
        $validated = $request->validate([
            'is_read' => 'required|boolean',
        ]);

        $contact_message->update(['is_read' => $validated['is_read']]);

        $status = $validated['is_read'] ? 'dibaca' : 'belum dibaca';
        return redirect()->back()->with('success', "Pesan ditandai sebagai $status.");
    }

    public function destroy(ContactMessage $contact_message)
    {
        $contact_message->delete();
        return redirect()->back()->with('success', 'Pesan berhasil dihapus.');
    }
}
