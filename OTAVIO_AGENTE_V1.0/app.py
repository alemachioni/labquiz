#pip install flask anthropic
#python app.py
#http://localhost:5000



# app.py
# Servidor Flask - Agente de IA Klabin com Claude (Anthropic)
# Execucao local: python app.py

import json
import anthropic
from flask import Flask, render_template, request, jsonify
from klabin_data import KLABIN_DATA

# ---------------------------------------------------------------------------
# CONFIGURACAO
# ---------------------------------------------------------------------------

ANTHROPIC_API_KEY = "sk-ant-xxxxxxxxxxxxxxxx"  # <-- Substitua pela sua chave real

app = Flask(__name__)

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# ---------------------------------------------------------------------------
# PROMPT DO SISTEMA
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """
Voce e um assistente de inteligencia de negocios da Klabin, uma das maiores
empresas de papel e embalagens do Brasil.

Voce recebe um conjunto de dados estruturados da empresa e deve responder
perguntas dos usuarios de forma clara, precisa e profissional, sempre em
portugues brasileiro.

REGRAS DE RESPOSTA:
1. Sempre responda em portugues brasileiro formal.
2. Sua resposta DEVE ter DOIS blocos distintos:

   BLOCO 1 - ANALISE TEXTUAL:
   Um paragrafo analitico com os principais insights, tendencias e
   observacoes relevantes sobre os dados solicitados.

   BLOCO 2 - TABELA:
   Uma tabela formatada em HTML puro com os dados numericos relevantes.
   Use EXATAMENTE este formato HTML para a tabela:

   <table>
     <thead>
       <tr>
         <th>Coluna 1</th>
         <th>Coluna 2</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>Dado</td>
         <td>Dado</td>
       </tr>
     </tbody>
   </table>

3. Se a pergunta nao puder ser respondida com os dados disponiveis,
   explique educadamente o que esta disponivel no dataset.

4. Sempre mencione o periodo e unidade dos dados.
5. Destaque valores maximos, minimos e medias quando relevante.
6. Nao invente dados. Use apenas o que esta no dataset fornecido.

SEPARADOR OBRIGATORIO:
Entre o bloco de texto e a tabela, insira exatamente esta linha:
---TABELA---

Estrutura obrigatoria da resposta:
[seu texto analitico aqui]
---TABELA---
[sua tabela HTML aqui]
"""

# ---------------------------------------------------------------------------
# ROTA PRINCIPAL
# ---------------------------------------------------------------------------

@app.route("/")
def index():
    """Renderiza a pagina principal."""
    return render_template("index.html")


# ---------------------------------------------------------------------------
# ROTA DA API - PROCESSAR CONSULTA
# ---------------------------------------------------------------------------

@app.route("/consultar", methods=["POST"])
def consultar():
    """
    Recebe a pergunta do usuario, envia para o Claude junto com o dataset,
    e retorna a resposta formatada.
    """
    dados_requisicao = request.get_json()
    pergunta_usuario = dados_requisicao.get("pergunta", "").strip()

    if not pergunta_usuario:
        return jsonify({
            "erro": "Por favor, digite uma pergunta."
        }), 400

    # Converte o dataset para texto estruturado para o Claude
    dataset_texto = json.dumps(KLABIN_DATA, ensure_ascii=False, indent=2)

    # Mensagem para o Claude com o dataset embutido
    mensagem_usuario = f"""
DATASET KLABIN 2025 (dados ficticios para teste):
{dataset_texto}

PERGUNTA DO USUARIO:
{pergunta_usuario}

Responda com base EXCLUSIVAMENTE nos dados acima.
Lembre-se de separar o texto da tabela com ---TABELA---
"""

    try:
        # Chamada a API do Claude
        resposta = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=2048,
            system=SYSTEM_PROMPT,
            messages=[
                {
                    "role": "user",
                    "content": mensagem_usuario
                }
            ]
        )

        conteudo_resposta = resposta.content[0].text

        # Separar o texto da tabela usando o separador definido
        if "---TABELA---" in conteudo_resposta:
            partes = conteudo_resposta.split("---TABELA---", 1)
            texto_analise = partes[0].strip()
            tabela_html = partes[1].strip()
        else:
            # Caso o Claude nao use o separador, retorna tudo como texto
            texto_analise = conteudo_resposta.strip()
            tabela_html = ""

        return jsonify({
            "sucesso": True,
            "texto": texto_analise,
            "tabela": tabela_html,
            "pergunta": pergunta_usuario
        })

    except anthropic.AuthenticationError:
        return jsonify({
            "erro": "Chave de API invalida. Verifique sua ANTHROPIC_API_KEY no arquivo app.py."
        }), 401

    except anthropic.RateLimitError:
        return jsonify({
            "erro": "Limite de requisicoes atingido. Aguarde um momento e tente novamente."
        }), 429

    except Exception as e:
        return jsonify({
            "erro": f"Erro ao processar a consulta: {str(e)}"
        }), 500


# ---------------------------------------------------------------------------
# INICIALIZACAO
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    print("=" * 55)
    print("  Klabin AI Agent - Iniciando servidor...")
    print("  Acesse: http://localhost:5000")
    print("=" * 55)
    app.run(debug=True, port=5000)
