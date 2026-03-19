import { useState } from "react";
import { convertSheet } from "./utils/chordConverter.js";
import "./App.css";

const EXAMPLE_INPUT = "C G Am F\nF C G Am\nDm G7 C";

function FingDiagram({ fingering }) {
  if (fingering === "—") return <span className="unknown">—</span>;
  const frets = fingering.split("").map(Number);
  const strings = ["G", "C", "E", "A"];
  return (
    <div className="fing-diagram" title="G C E A strings">
      {frets.map((fret, i) => (
        <span key={i} className="fing-string">
          <span className="fing-name">{strings[i]}</span>
          <span className="fing-fret">{fret}</span>
        </span>
      ))}
    </div>
  );
}

function ChordRow({ chord }) {
  return (
    <tr className={chord.simplified ? "simplified-row" : ""}>
      <td>{chord.original}</td>
      <td>
        {chord.ukChord}
        {chord.simplified && (
          <span className="badge" title="Simplified for playability">
            簡略
          </span>
        )}
      </td>
      <td>
        <code className="fingering">{chord.fingering}</code>
      </td>
      <td>
        <FingDiagram fingering={chord.fingering} />
      </td>
    </tr>
  );
}

function CapoBanner({ capoSuggestion, detectedKey }) {
  if (!capoSuggestion) return null;
  return (
    <div className="capo-banner">
      <span className="capo-icon">🎵</span>
      <div>
        <strong>カポ推奨</strong>
        <span>
          キー <em>{detectedKey}</em> → カポ {capoSuggestion.capo}
          &nbsp;（{capoSuggestion.playKey} ポジションで演奏）
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  function handleConvert() {
    if (!input.trim()) return;
    setResult(convertSheet(input));
  }

  function handleExample() {
    setInput(EXAMPLE_INPUT);
    setResult(convertSheet(EXAMPLE_INPUT));
  }

  function handleReset() {
    setInput("");
    setResult(null);
  }

  const allRows = result ? result.lines.flat() : [];

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎸 → 🎵 ウクレレコード変換</h1>
        <p className="subtitle">
          ギターコード譜を入力すると、ウクレレ用コードと押さえ方に変換します
        </p>
      </header>

      <main className="app-main">
        <section className="input-section">
          <label htmlFor="chord-input" className="input-label">
            コード譜を入力（スペース・改行で区切ってください）
          </label>
          <textarea
            id="chord-input"
            className="chord-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"例：\nC G Am F\nF C G Am"}
            rows={5}
          />
          <div className="button-row">
            <button className="btn btn-primary" onClick={handleConvert}>
              変換する
            </button>
            <button className="btn btn-secondary" onClick={handleExample}>
              サンプル入力
            </button>
            <button className="btn btn-ghost" onClick={handleReset}>
              リセット
            </button>
          </div>
        </section>

        {result && (
          <section className="result-section">
            <CapoBanner
              capoSuggestion={result.capoSuggestion}
              detectedKey={result.key}
            />

            <div className="table-wrapper">
              <table className="chord-table">
                <thead>
                  <tr>
                    <th>入力コード</th>
                    <th>ウクレレコード</th>
                    <th>押さえ方（タブ）</th>
                    <th>弦別（G C E A）</th>
                  </tr>
                </thead>
                <tbody>
                  {allRows.map((chord, i) => (
                    <ChordRow key={i} chord={chord} />
                  ))}
                </tbody>
              </table>
            </div>

            <p className="tuning-note">
              ※ 標準チューニング GCEA / 押さえ方はフレット番号
            </p>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>UkuleleCode — ギター譜 → ウクレレ譜変換ツール</p>
      </footer>
    </div>
  );
}
