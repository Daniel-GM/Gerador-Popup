import Span from "./Span"
import TextContainer from "./TextContainer"

const PopupViewer = ({ logo, configLogo, textArray, backgroundContainer, colorIcons, backgroundIcons, contrast }) => {

  const stylesBackground = {
    backgroundColor: backgroundContainer || '#ffffff'
  }

  return (
    <div className="w-full flex justify-center">
      <div
        id="popup"
        className="w-[1080px] h-[1920px] flex flex-col p-12 items-center justify-between gap-5"
        style={stylesBackground}
      >
        {/* logo */}
        <div className="w-[400px] h-[260px] flex justify-center items-center">
          <img
            className=""
            style={{
              width: `${configLogo["width"]}px`,
              height: `${configLogo["height"]}px`,
            }}
            src={logo}
          ></img>
        </div>

        {/* header */}
        <TextContainer>
          {textArray.header.map((item) => (
            <Span
              key={item.id}
              label={item.label}
              size={item.size}
              weight={item.weight}
              color={item.color}
            />
          ))}
        </TextContainer>

        {/* intro */}
        <TextContainer>
          {textArray.intro.map((item) => (
            <Span
              key={item.id}
              label={item.label}
              size={item.size}
              weight={item.weight}
              color={item.color}
            />
          ))}
        </TextContainer>

        {/* steps */}
        <TextContainer additionalStyle="gap-22">
          {textArray.step.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-start gap-4"
            >
              <div className="flex items-center">
                <div
                  className="mr-10 rounded-full p-4 w-22 h-20 flex items-center justify-center"
                  style={{
                    backgroundColor: backgroundIcons
                  }}
                >

                  <Span
                    additionalStyle=""
                    number={item.number}
                    size={item.size}
                    weight={item.weight}
                    color={contrast}
                  />
                </div>

                <Span
                  additionalStyle="text-left w-full"
                  label={item.label}
                  size={item.size}
                  weight={item.weight}
                  color={item.color}
                />
              </div>
              <div className="flex justify-center items center gap-18">
                {item.icons.map((icon, index) => (
                  <div
                    key={index}
                    className="w-[150px] h-[150px] p-4 rounded-[150px] flex justify-center items-center"
                    style={{
                      backgroundColor: backgroundIcons
                    }}
                  >
                    <img
                      key={index}
                      style={{
                        filter: contrast === "#ffffff" ? 'invert(1)' : 'brightness(0)'
                      }}
                      className={`w-[80px]`}
                      src={icon || null}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TextContainer>

        {/* footer */}
        <TextContainer>
          {textArray.footer.map((item) => (
            <Span
              key={item.id}
              label={item.label}
              size={item.size}
              weight={item.weight}
              color={item.color}
            />
          ))}
        </TextContainer>

        {/* button */}
        <TextContainer>
          <Span
            key={textArray.button[0].key}
            label={textArray.button[0].label}
            size={textArray.button[0].size}
            weight={textArray.button[0].weight}
            color={contrast}
            backgroundColor={textArray.button[0].backgroundColor}
            additionalStyle="w-[325px] p-1 rounded-xl pt-4 leading-none"
          />
        </TextContainer>
      </div>
    </div>
  )
}

export default PopupViewer