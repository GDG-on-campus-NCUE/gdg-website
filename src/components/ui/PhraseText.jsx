import { Fragment } from 'react';

/**
 * 中文標題只准在標點處換行（移植自 ming-website 的 PhraseText）。
 * 瀏覽器對 CJK 逐字斷行，text-wrap: balance 會把「看得懂」拆成「看得／懂」；
 * 這裡把句子依標點切成片段，每段包成 inline-block，片段之間才會換行。
 * 片段比一行還長時，inline-block 的寬度會被容器限制，裡面照常換行，不會溢出。
 */
export default function PhraseText({ text }) {
    if (typeof text !== 'string') return text;
    const parts = text.match(/[^，、。？！,.]+[，、。？！,.]?\s*/g) ?? [text];
    return (
        <>
            {parts.map((part, i) => (
                <Fragment key={i}>
                    <span className="inline-block">{part.trimEnd()}</span>
                    {part.endsWith(' ') ? ' ' : ''}
                </Fragment>
            ))}
        </>
    );
}
