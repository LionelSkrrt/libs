const supabase = require('../config/supabase');

// 1. GET /api/loans (Filter query: ?status=Terlambat&member_id=...)
exports.getLoans = async (req, res) => {
  try {
    const { status, member_id, book_title } = req.query;

    let query = supabase
      .from('loans')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (member_id) {
      query = query.eq('member_id', member_id);
    }
    if (book_title) {
      query = query.ilike('book_title', `%${book_title}%`);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil data peminjaman',
      total: data.length,
      data
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// 2. GET /api/loans/:id
exports.getLoanById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Data peminjaman tidak ditemukan' });
    }

    return res.status(200).json({
      success: true,
      message: 'Detail peminjaman ditemukan',
      data
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// 3. POST /api/loans
exports.createLoan = async (req, res) => {
  try {
    const { member_name, member_id, book_title, book_isbn, loan_date, due_date, notes } = req.body;

    if (!member_name || !member_id || !book_title || !due_date) {
      return res.status(400).json({
        success: false,
        message: 'Field member_name, member_id, book_title, dan due_date wajib diisi'
      });
    }

    const payload = {
      member_name,
      member_id,
      book_title,
      book_isbn: book_isbn || null,
      loan_date: loan_date || new Date().toISOString().split('T')[0],
      due_date,
      status: 'Dipinjam',
      notes: notes || null
    };

    const { data, error } = await supabase
      .from('loans')
      .insert([payload])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(201).json({
      success: true,
      message: 'Data peminjaman berhasil dibuat',
      data
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// 4. PUT /api/loans/:id
exports.updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { member_name, member_id, book_title, book_isbn, due_date, return_date, status, notes } = req.body;

    const updates = {
      updated_at: new Date().toISOString()
    };

    if (member_name !== undefined) updates.member_name = member_name;
    if (member_id !== undefined) updates.member_id = member_id;
    if (book_title !== undefined) updates.book_title = book_title;
    if (book_isbn !== undefined) updates.book_isbn = book_isbn;
    if (due_date !== undefined) updates.due_date = due_date;
    if (return_date !== undefined) updates.return_date = return_date;
    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    const { data, error } = await supabase
      .from('loans')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Gagal memperbarui: data tidak ditemukan' });
    }

    return res.status(200).json({
      success: true,
      message: 'Data peminjaman berhasil diperbarui',
      data
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// 5. DELETE /api/loans/:id
exports.deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('loans')
      .delete()
      .eq('id', id)
      .select();

    if (error || !data || data.length === 0) {
      return res.status(404).json({ success: false, message: 'Gagal menghapus: data tidak ditemukan' });
    }

    return res.status(200).json({
      success: true,
      message: `Peminjaman dengan ID ${id} berhasil dihapus`
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};
