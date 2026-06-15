import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../../components/shared/DecorativeDots";
import WaveFooter from "../../components/shared/WaveFooter";
import { apiFetch } from "../../utils/api";

type ApiStudent = {
  id: string;
  name: string;
  email: string;
};

const inputClass =
  "w-full py-2.5 px-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-primary transition-colors box-border bg-white";
const labelClass = "block text-xs sm:text-sm font-semibold text-gray-600 mb-1.5";

export default function ManageStudentsPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<ApiStudent[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [search,   setSearch]   = useState("");

  const [newName,     setNewName]     = useState("");
  const [newEmail,    setNewEmail]    = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [creating,    setCreating]    = useState(false);
  const [createMsg,   setCreateMsg]   = useState<{ ok: boolean; msg: string } | null>(null);

  const [editingId,    setEditingId]    = useState<string | null>(null);
  const [editName,     setEditName]     = useState("");
  const [editEmail,    setEditEmail]    = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [saving,       setSaving]       = useState(false);

  useEffect(() => {
    apiFetch("/students")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        setStudents(await res.json());
      })
      .catch(() => setError("Não foi possível carregar os alunos."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter((s) => {
    const termo = search.trim().toLowerCase();
    if (!termo) return true;
    return s.name.toLowerCase().includes(termo) || s.email.toLowerCase().includes(termo);
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateMsg(null);
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      setCreateMsg({ ok: false, msg: "Preencha nome, e-mail e senha." });
      return;
    }

    setCreating(true);
    try {
      const res = await apiFetch("/students", {
        method: "POST",
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim(),
          password: newPassword,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro ?? data.error ?? "Erro ao criar aluno");
      }
      const aluno: ApiStudent = await res.json();
      setStudents((prev) => [...prev, aluno].sort((a, b) => a.name.localeCompare(b.name)));
      setCreateMsg({ ok: true, msg: "Aluno adicionado com sucesso!" });
      setNewName("");
      setNewEmail("");
      setNewPassword("");
    } catch (err: unknown) {
      setCreateMsg({ ok: false, msg: err instanceof Error ? err.message : "Erro ao criar aluno" });
    } finally {
      setCreating(false);
    }
  }

  function startEdit(s: ApiStudent) {
    setEditingId(s.id);
    setEditName(s.name);
    setEditEmail(s.email);
    setEditPassword("");
  }

  async function handleSave(id: string) {
    if (!editName.trim() || !editEmail.trim()) {
      setError("Nome e e-mail são obrigatórios.");
      return;
    }

    setSaving(true);
    try {
      const res = await apiFetch(`/students/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: editName.trim(),
          email: editEmail.trim(),
          ...(editPassword.trim() ? { password: editPassword.trim() } : {}),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro ?? data.error ?? "Erro ao salvar aluno");
      }
      const atualizado: ApiStudent = await res.json();
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...atualizado } : s)).sort((a, b) => a.name.localeCompare(b.name))
      );
      setEditingId(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Não foi possível salvar a alteração.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s: ApiStudent) {
    const ok = window.confirm(`Excluir o aluno "${s.name}"? Essa ação não pode ser desfeita.`);
    if (!ok) return;
    try {
      const res = await apiFetch(`/students/${s.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setStudents((prev) => prev.filter((x) => x.id !== s.id));
    } catch {
      setError("Não foi possível excluir o aluno.");
    }
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center font-sans relative overflow-x-hidden">
      <DecorativeDots />

      <main className="w-full max-w-3xl px-6 py-8 relative z-10 flex-1">
        <button
          className="text-red-primary text-sm sm:text-base font-semibold font-gugi pb-4 block bg-transparent border-none cursor-pointer"
          onClick={() => navigate("/professor")}
        >
          &lt; Voltar
        </button>

        <h1 className="font-gugi text-3xl sm:text-4xl text-gray-900 mb-2 text-center">Gerenciar alunos</h1>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-6">
          Adicione, edite ou remova contas de alunos.
        </p>

        <form onSubmit={handleCreate} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-6 mb-6 flex flex-col gap-3">
          <h2 className="font-gugi text-lg sm:text-xl text-gray-900 m-0">Adicionar aluno</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>Nome</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nome do aluno"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>E-mail</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="aluno@aluno.cps.sp.gov.br"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Senha</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
          </div>

          {createMsg && (
            <p className={`text-sm m-0 ${createMsg.ok ? "text-green-correct" : "text-red-primary"}`}>
              {createMsg.msg}
            </p>
          )}

          <button
            type="submit"
            disabled={creating}
            className="w-full sm:w-auto sm:self-start sm:px-8 py-2.5 bg-red-primary text-white font-bold text-sm rounded-lg font-gugi disabled:opacity-60 transition-opacity cursor-pointer border-none"
          >
            {creating ? "Adicionando…" : "Adicionar aluno"}
          </button>
        </form>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Procurar por nome ou e-mail…"
          className={`${inputClass} mb-5 py-3`}
        />

        {loading && (
          <p className="font-gugi text-red-primary text-center">Carregando alunos…</p>
        )}
        {error && <p className="text-red-primary text-sm text-center mb-4">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-gray-500 text-sm text-center">Nenhum aluno encontrado.</p>
        )}

        <div className="flex flex-col gap-3">
          {filtered.map((s) => (
            <div key={s.id} className="bg-red-bg rounded-2xl p-4 shadow-sm">
              {editingId === s.id ? (
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelClass}>Nome</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>E-mail</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Nova senha (opcional)</label>
                    <input
                      type="password"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      placeholder="Deixe em branco para manter a senha atual"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(s.id)}
                      disabled={saving || !editName.trim() || !editEmail.trim()}
                      className="px-4 py-2 bg-green-correct text-white text-sm font-semibold rounded-lg border-none cursor-pointer disabled:opacity-60"
                    >
                      {saving ? "Salvando…" : "Salvar"}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm sm:text-base text-gray-900 font-semibold m-0">{s.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 m-0">{s.email}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(s)}
                      className="px-3 py-1.5 bg-white text-red-primary text-xs sm:text-sm font-semibold rounded-lg border border-red-primary cursor-pointer hover:bg-red-primary hover:text-white transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(s)}
                      className="px-3 py-1.5 bg-red-primary text-white text-xs sm:text-sm font-semibold rounded-lg border-none cursor-pointer hover:bg-red-dark transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <WaveFooter />
    </div>
  );
}
