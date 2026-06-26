import DevicePreview from './DevicePreview'

export default function WebAnteprimaSection() {
  return (
    <section className="section" data-bg="paper" id="anteprima" data-sig="">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow web-eyebrow">anteprima dal vivo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Un sito che sta<br />bene ovunque.
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '32ch' }}>
            Stessa pagina, tre viewport. Cambia dispositivo: il layout si ricompone, non si rompe.
          </p>
        </div>

        <DevicePreview />
      </div>
    </section>
  )
}
