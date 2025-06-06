// importing icons
import iconOptions from './assets/components/iconOptions'

// importing React
import { useState } from 'react'
import Container from './assets/components/Container'
import PopupViewer from './assets/components/PopupViewer'
import { toPng } from 'html-to-image'
import InputSize from './assets/components/InputSize'

function App() {
  const [logo, setLogo] = useState('/logo/logo.png')
  const [configLogo, setConfigLogo] = useState({ width: "20", height: "50", })
  const [backgroundContainer, setBackgroundContainer] = useState('#ffffff')
  const [colorIcons, setColorIcons] = useState('#000000')
  const [backgroundIcons, setBackgroundIcons] = useState('#017365')
  const [contrast, setContrast] = useState('#ffffff')
  const [textArray, setTextArray] = useState({
    header: [
      { id: 1, size: '53', weight: 'font-cardium-400', label: 'Seja Bem Vindo(a) ao Pede Aí,', color: '#017365', },
      { id: 2, size: '58', weight: 'font-cardium-500', label: 'Petiscaria Gastrobar!', color: '#000000', },
    ],
    intro: [
      { id: 3, size: '50', weight: 'font-cardium-400', label: 'É Simples, rápido e fácil.', color: '#000000', },
      { id: 4, size: '46', weight: 'font-cardium-500', label: 'Saiba como realizar o seu pedido:', color: '#017365', },
    ],
    step: [
      {
        id: 5,
        size: '56',
        weight: 'font-cardium-500',
        label: 'Escolha o que deseja.',
        number: '1',
        color: '#000000',
        icons: [],
      },
      {
        id: 6,
        size: '56',
        weight: 'font-cardium-500',
        label: 'Escolha como pagar.',
        number: '2',
        color: '#000000',
        icons: ['/icons/payment/cartao-de-debito.png', '/icons/payment/pagamento.png', '/icons/payment/pix.png'],
      },
      {
        id: 7,
        size: '56',
        weight: 'font-cardium-500',
        label: 'Finalize o seu pedido',
        number: '3',
        color: '#000000',
        icons: ['/icons/finish/ok.png', '/icons/finish/gps.png', '/icons/finish/fav.png'],
      },
    ],
    footer: [
      { id: 8, size: '42', weight: 'font-cardium-400', label: 'Depois que finalizar é só aguardar que', color: '#017365', },
      { id: 9, size: '46', weight: 'font-cardium-400', label: 'entregamos para você!', color: '#000000', },
    ],
    button: [
      { id: 10, size: '60', weight: 'font-comfortaa-400', label: 'Pede Aí', color: '#000000', backgroundColor: '#017365' },
    ]
  })

  const handleIconChange = (iconSelected) => {
    setTextArray(prevTextArray => {
      const currentIcons = prevTextArray.step[0].icons || []
      let updatedIcons

      if (currentIcons.includes(iconSelected)) {
        updatedIcons = currentIcons.filter(icon => icon !== iconSelected)
      } else {
        if (currentIcons.length >= 3) return prevTextArray
        updatedIcons = [...currentIcons, iconSelected]
      }

      const updatedSteps = [...prevTextArray.step]
      updatedSteps[0] = {
        ...updatedSteps[0],
        icons: updatedIcons
      }

      return {
        ...prevTextArray,
        step: updatedSteps
      }
    })
  }

  const handleTextColorChange = (e) => {
    const newColor = e.target.value
    setTextArray(prevTextArray => ({
      ...prevTextArray,
      header: prevTextArray.header.map((item, index) =>
        index === 0 ? { ...item, color: newColor } : item
      ),
      intro: prevTextArray.intro.map((item, index) =>
        index === 1 ? { ...item, color: newColor } : item
      ),
      footer: prevTextArray.footer.map((item, index) =>
        index === 0 ? { ...item, color: newColor } : item
      ),
      button: prevTextArray.button.map((item, index) =>
        index === 0 ? { ...item, backgroundColor: newColor } : item
      ),
    }))
    handleBackgroundColorIconChange(newColor)
    setContrast(handleCalculateContrast(newColor))
  }

  const handleBackgroundColorIconChange = (newColor) => {
    setBackgroundIcons(newColor)
  }

  const handleBackgroundColorContainerChange = (e) => {
    const newColor = e.target.value
    setBackgroundContainer(newColor)
    handleBlackWhiteChange(handleCalculateContrast(newColor))
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log("Tipo de arquivo:", file.type)
      if (file.type.startsWith('image/')) {

        const imageUrl = URL.createObjectURL(file)
        setLogo(imageUrl)
      } else {
        alert('Por favor, selecione um arquivo de imagem (ex.: .jpg, .png).')
        setLogo(null)
      }
    }
  }

  const handleConfigLogoChange = (e, id) => {
    const newSize = e.target.value
    setConfigLogo({
      ...configLogo,
      [id]: newSize
    })
  }

  const handleCalculateContrast = (e) => {
    const hex = e.replace('#', '')
    const red = parseInt(hex.substring(0, 2), 16)
    const green = parseInt(hex.substring(2, 4), 16)
    const blue = parseInt(hex.substring(4, 6), 16)
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue
    return luminance > 127.5 ? "#000000" : "#ffffff"
  }

  const handleBlackWhiteChange = (newColor) => {
    setColorIcons(newColor)
    setTextArray(prevTextArray => ({
      ...prevTextArray,
      header: prevTextArray.header.map((item, index) =>
        index === 1 ? { ...item, color: newColor } : item
      ),
      intro: prevTextArray.intro.map((item, index) =>
        index === 0 ? { ...item, color: newColor } : item
      ),
      step: prevTextArray.step.map((item, index) => (
        { ...item, color: newColor }
      )),
      footer: prevTextArray.footer.map((item, index) =>
        index === 1 ? { ...item, color: newColor } : item
      ),
      button: prevTextArray.button.map((item, index) =>
        index === 0 ? { ...item, color: newColor } : item
      ),
    }))
  }

  const handleDownload = () => {
    const element = document.getElementById('popup')

    const originalStyle = {
      width: element.style.width,
      height: element.style.height,
    }

    element.style.width = "1080px"
    element.style.height = "1920px"

    toPng(element)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'popup.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.error('Erro ao gerar a imagem:', err)
      })
      .finally(() => {
        element.style.width = originalStyle.width
        element.style.height = originalStyle.height
      })
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 h-full">
        <div className="container mx-auto p-6 h-full md:w-auto w-full">
          <div className="grid grid-cols-1 h-full">
            <Container additionalStyle='grid grid-cols-3 gap-4 bg-gray-800/50 p-6'>
              <h1 className="text-3xl col-span-3 text-white font-semibold">Configurações</h1>

              {/* Logo config */}
              <Container additionalStyle='bg-gray-900/50 p-4'>
                <h2 className="text-xl col-span-3 text-white font-semibold mb-2">Logo do cliente</h2>
                <div className='flex flex-col justify-center items-center gap-3'>
                  <div className='flex flex-col text-white'>
                    <InputSize label={"Largura"} valueSize={configLogo} axis={"width"} max={400} handleConfigLogoChange={handleConfigLogoChange} />
                    <InputSize label={"Altura"} valueSize={configLogo} axis={"height"} max={260} handleConfigLogoChange={handleConfigLogoChange} />
                  </div>
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                  <img
                    src={logo}
                    alt="logo"
                    className='w-[115px] h-[115px]'
                    onClick={handleLogoChange}
                  />
                  <button
                    name="logo"
                    className='bg-white text-black px-2 py-1 rounded-2xl cursor-pointer w-full'
                    onClick={() => document.getElementById("logo").click()}
                  >
                    Adicionar a logo do cliente
                  </button>
                </div>
              </Container>

              {/* Color config */}
              <Container additionalStyle='bg-gray-900/50 p-4'>
                <h2 className="text-xl col-span-3 text-white font-semibold">Cores</h2>
                <h3 className='text-white'>Cor do texto</h3>
                <input
                  type='color'
                  value={textArray.header[0].color}
                  onChange={handleTextColorChange}
                />
                <h3 className='text-white'>Cor do fundo</h3>
                <input
                  type='color'
                  value={backgroundContainer}
                  onChange={handleBackgroundColorContainerChange}
                />
              </Container>

              {/* icons config */}
              <Container additionalStyle='bg-gray-900/50 p-4 h-[350px] flex flex-col'>
                <h2 className="text-xl col-span-3 text-white font-semibold">Icones</h2>
                <div className='flex flex-col gap-3 overflow-auto w-full'>
                  <div className='flex flex-wrap items-center p-2 gap-6'>
                    {iconOptions.map((option, index) => {
                      const isSelected = textArray.step[0].icons.includes(option.icon)
                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-full h-16 w-16 flex items-center justify-center transition-all duration-200 ${
                            isSelected ? 'ring-4 ring-green-500' : ''
                          }`}
                          style={{
                            backgroundColor: textArray.header[0].color
                          }}
                          onClick={() => handleIconChange(option.icon)}
                        >
                          <img
                            src={option.icon || null}
                            className='w-12'
                            style={{
                              filter: contrast === "#ffffff" ? 'invert(1)' : 'brightness(0)'
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Container>

              <div className='py-1 col-start-2 text-center bg-[#017365] hover:bg-[#00a58f] text-white hover:text-black transition duration-300 rounded-full' onClick={handleDownload}>Download</div>
            </Container>
            <Container additionalStyle='bg-gray-800/50 p-6'>
              <PopupViewer logo={logo} configLogo={configLogo} contrast={contrast} textArray={textArray} backgroundContainer={backgroundContainer} colorIcons={colorIcons} backgroundIcons={backgroundIcons} />
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
