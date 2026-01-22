import React, { useEffect, useRef, useState, useCallback } from 'react'
import clsx from 'clsx'
import * as PIXI from 'pixi.js'
import { ShortcutsPanel } from './ShortcutsPanel'

const Icon = ({ path }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
)

const UploadIcon = () => (
  <Icon
    path={
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
      </>
    }
  />
)

const DownloadIcon = () => (
  <Icon
    path={
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </>
    }
  />
)

const UndoIcon = () => (
  <Icon
    path={
      <>
        <path d="M3 7v6h6" />
        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
      </>
    }
  />
)

const RedoIcon = () => (
  <Icon
    path={
      <>
        <path d="M21 7v6h-6" />
        <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
      </>
    }
  />
)

const ResetIcon = () => (
  <Icon
    path={
      <>
        <path d="M3 12a9 9 0 0 1 15-6.7" />
        <polyline points="18 3 18 9 12 9" />
        <path d="M21 12a9 9 0 0 1-15 6.7" />
        <polyline points="6 21 6 15 12 15" />
      </>
    }
  />
)

const MonitorIcon = () => (
  <Icon
    path={
      <>
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </>
    }
  />
)

const BrushIcon = () => (
  <Icon
    path={
      <>
        <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2.5 6.04 0 1.38-.52 2.5 2.2 2.5 3.18 0 2-2.5 6-2.5 1.65 0 3-1.35 3-3.02l-5.7-5.71Z" />
      </>
    }
  />
)

const EraserIcon = () => (
  <Icon
    path={
      <>
        <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
        <path d="M22 21H7" />
        <path d="m5 11 9 9" />
      </>
    }
  />
)

const MousePointer2Icon = () => (
  <Icon
    path={
      <>
        <path d="m12 6 4 6-2.2 6H5.2L3 12h9Z" />
        <path d="m12 6 4 6" />
      </>
    }
  />
)

const BoxSelectIcon = () => (
  <Icon
    path={
      <>
        <path d="M5 3a2 2 0 0 0-2 2" />
        <path d="M19 3a2 2 0 0 1 2 2" />
        <path d="M21 19a2 2 0 0 1-2 2" />
        <path d="M5 21a2 2 0 0 1-2-2" />
        <path d="M9 3h1" />
        <path d="M9 21h1" />
        <path d="M14 3h1" />
        <path d="M14 21h1" />
        <path d="M3 9v1" />
        <path d="M21 9v1" />
        <path d="M3 14v1" />
        <path d="M21 14v1" />
      </>
    }
  />
)

const CircleIcon = () => <Icon path={<circle cx="12" cy="12" r="10" />} />

const LassoIcon = () => (
  <Icon
    path={
      <>
        <path d="M7 22a5 5 0 0 1-2-4" />
        <path d="M3.3 14A6.8 6.8 0 0 1 2 10c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8c-1.2 0-2.3-.2-3.3-.5" />
        <path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M5 14v4" />
        <path d="M5 18l2-2" />
      </>
    }
  />
)

const SettingsIcon = () => (
  <Icon
    path={
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    }
  />
)

const Header = ({
  onUpload,
  onDownload,
  onUndo,
  onReset,
  onRedo,
  onOpenSettings,
  canUndo,
  canReset,
  canRedo,
  canDownload,
}) => {
  return (
    <header className="h-14 border-b border-accent bg-background/80 backdrop-blur flex items-center px-6 justify-between z-50 relative">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-primary">
          <MonitorIcon />
          <span className="font-bold tracking-widest">Alpha 编辑器</span>
        </div>
        <div className="h-4 w-[1px] bg-accent" />
        <span className="text-xs text-muted-foreground">v1.1.0</span>
      </div>

      <div className="flex items-center gap-2">
        <label className="cursor-pointer hover:bg-accent p-2 rounded transition-colors group">
          <input
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/tiff"
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
          />
          <UploadIcon />
        </label>
        <button
          className={clsx(
            'p-2 rounded transition-colors group',
            canDownload ? 'hover:bg-accent' : 'opacity-40 cursor-not-allowed',
          )}
          onClick={onDownload}
          disabled={!canDownload}
          title="下载"
        >
          <DownloadIcon />
        </button>
        <div className="h-4 w-[1px] bg-accent mx-2" />
        <button
          className={clsx(
            'p-2 rounded transition-colors group',
            canUndo ? 'hover:bg-accent' : 'opacity-40 cursor-not-allowed',
          )}
          onClick={onUndo}
          disabled={!canUndo}
          title="撤销"
        >
          <UndoIcon />
        </button>
        <button
          className={clsx(
            'p-2 rounded transition-colors group',
            canReset ? 'hover:bg-accent' : 'opacity-40 cursor-not-allowed',
          )}
          onClick={onReset}
          disabled={!canReset}
          title="重置"
        >
          <ResetIcon />
        </button>
        <button
          className={clsx(
            'p-2 rounded transition-colors group',
            canRedo ? 'hover:bg-accent' : 'opacity-40 cursor-not-allowed',
          )}
          onClick={onRedo}
          disabled={!canRedo}
          title="重做"
        >
          <RedoIcon />
        </button>
        <div className="h-4 w-[1px] bg-accent mx-2" />
        <button
          className="p-2 rounded transition-colors hover:bg-accent"
          onClick={onOpenSettings}
          title="设置快捷键"
        >
          <SettingsIcon />
        </button>
      </div>
    </header>
  )
}

const tools = [
  { id: 'move', icon: MousePointer2Icon, label: '移动' },
  { id: 'brush', icon: BrushIcon, label: '画笔（涂抹）' },
  { id: 'eraser', icon: EraserIcon, label: '橡皮擦（还原）' },
  { id: 'rect-select', icon: BoxSelectIcon, label: '矩形选区' },
  { id: 'circle-select', icon: CircleIcon, label: '圆形选区' },
  { id: 'lasso-select', icon: LassoIcon, label: '套索' },
]

const DownloadDialog = ({ isOpen, onClose, onConfirm, defaultName }) => {
  const [fileName, setFileName] = useState(defaultName)

  useEffect(() => {
    if (isOpen) {
      setFileName(defaultName)
    }
  }, [isOpen, defaultName])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background border border-accent rounded-lg shadow-2xl w-[400px] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-accent bg-muted/30">
          <h3 className="font-bold">保存图片</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded transition-colors text-muted-foreground hover:text-foreground"
          >
            <Icon path={<path d="M18 6 6 18M6 6l12 12" />} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">文件名</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="flex-1 bg-accent/50 border border-accent rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onConfirm(fileName)
                  if (e.key === 'Escape') onClose()
                }}
              />
              <span className="text-muted-foreground text-sm">.png</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 p-4 border-t border-accent bg-muted/30">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded hover:bg-accent transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => onConfirm(fileName)}
            className="px-4 py-2 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}

const ChevronLeftIcon = () => (
  <Icon
    path={<path d="m15 18-6-6 6-6" />}
  />
)

const ChevronRightIcon = () => (
  <Icon
    path={<path d="m9 18 6-6-6-6" />}
  />
)

const Toolbar = ({ activeTool, onToolChange, isOpen, onToggle }) => {
  return (
    <div className="flex items-start gap-2">
      <div
        className={clsx(
          "flex flex-col gap-2 p-2 bg-background/80 backdrop-blur border border-accent rounded-lg shadow-2xl transition-all duration-300 overflow-hidden",
          isOpen ? "w-16 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-full p-0 border-0"
        )}
      >
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={clsx(
              'p-3 rounded-md transition-all relative group shrink-0',
              activeTool === tool.id
                ? 'bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,229,255,0.25)]'
                : 'hover:bg-accent text-muted-foreground hover:text-foreground',
            )}
            title={tool.label}
          >
            <tool.icon />
            {activeTool === tool.id && (
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary rounded-l-md" />
            )}
          </button>
        ))}
      </div>
      <button
        onClick={onToggle}
        className="bg-background/80 backdrop-blur border border-accent rounded-lg p-2 shadow-lg hover:bg-accent transition-colors text-muted-foreground"
        title={isOpen ? "收起工具栏" : "展开工具栏"}
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
    </div>
  )
}

const PropertiesPanel = ({ state, onChange, isOpen, onToggle }) => {
  return (
    <div className="flex items-start gap-2 justify-end">
      <button
        onClick={onToggle}
        className="bg-background/80 backdrop-blur border border-accent rounded-lg p-2 shadow-lg hover:bg-accent transition-colors text-muted-foreground pointer-events-auto"
        title={isOpen ? "收起属性面板" : "展开属性面板"}
      >
        {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
      <div
        className={clsx(
          "bg-background/80 backdrop-blur border border-accent rounded-lg p-4 shadow-2xl pointer-events-auto transition-all duration-300 overflow-hidden",
          isOpen ? "w-80 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-full p-0 border-0"
        )}
      >
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 shrink-0">属性</h3>

        <div className="space-y-6">
          <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>画笔大小</span>
            <span className="text-primary font-mono">{state.brushSize}px</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            value={state.brushSize}
            onChange={(e) => onChange('brushSize', Number.parseInt(e.target.value, 10))}
            className="w-full h-1 bg-accent rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs block">画笔形状</span>
          <div className="flex bg-accent rounded p-1 gap-1">
            <button
              onClick={() => onChange('brushShape', 'circle')}
              className={clsx(
                'flex-1 py-1 text-xs rounded transition-colors',
                state.brushShape === 'circle'
                  ? 'bg-background text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              圆形
            </button>
            <button
              onClick={() => onChange('brushShape', 'square')}
              className={clsx(
                'flex-1 py-1 text-xs rounded transition-colors',
                state.brushShape === 'square'
                  ? 'bg-background text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              方形
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>不透明度</span>
            <span className="text-primary font-mono">{Math.round(state.opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.opacity}
            onChange={(e) => onChange('opacity', Number.parseFloat(e.target.value))}
            className="w-full h-1 bg-accent rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>图片大小</span>
            <span className="text-primary font-mono">{Math.round(state.zoom * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.25"
            max="4"
            step="0.01"
            value={state.zoom}
            onChange={(e) => onChange('zoom', Number.parseFloat(e.target.value))}
            className="w-full h-1 bg-accent rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
    </div>
  )
}

const Canvas = ({ image, state, onHistoryChange, onZoomChange, onBrushSizeChange, wheelAction }) => {
  const containerRef = useRef(null)
  const appRef = useRef(null)
  const resourcesRef = useRef({
    originalTexture: null,
    maskSprite: null,
    imageSprite: null,
    imageContainer: null,
    brushGraphics: null,
    layers: null,
    mask: null,
    baseScale: 1,
    history: { stack: [], index: -1, capacity: 15 },
    historyApi: null,
  })
  const interactionRef = useRef({
    isDrawing: false,
    isPanning: false,
    panPointerStart: null,
    panContainerStart: null,
    selection: { type: 'none' },
    selectionDraft: null,
    lassoPoints: [],
    strokeDirty: false,
  })
  const stateRef = useRef(state)
  const historyChangeRef = useRef(onHistoryChange)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    historyChangeRef.current = onHistoryChange
  }, [onHistoryChange])

  useEffect(() => {
    if (!containerRef.current) return

    const app = new PIXI.Application({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      backgroundColor: 0x1a1b1e,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      preserveDrawingBuffer: true,
    })

    containerRef.current.appendChild(app.view)
    appRef.current = app
    app.stage.sortableChildren = true

    const bgLayer = new PIXI.Container()
    bgLayer.zIndex = 0
    const contentLayer = new PIXI.Container()
    contentLayer.zIndex = 1
    const overlayLayer = new PIXI.Container()
    overlayLayer.zIndex = 2
    const interactionLayer = new PIXI.Container()
    interactionLayer.zIndex = 3
    interactionLayer.interactive = true
    interactionLayer.hitArea = app.screen

    app.stage.addChild(bgLayer)
    app.stage.addChild(contentLayer)
    app.stage.addChild(overlayLayer)
    app.stage.addChild(interactionLayer)

    const bgCanvas = document.createElement('canvas')
    bgCanvas.width = 20
    bgCanvas.height = 20
    const ctx = bgCanvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#2a2b2e'
    ctx.fillRect(0, 0, 10, 10)
    ctx.fillRect(10, 10, 10, 10)
    ctx.fillStyle = '#1a1b1e'
    ctx.fillRect(10, 0, 10, 10)
    ctx.fillRect(0, 10, 10, 10)
    const bgTexture = PIXI.Texture.from(bgCanvas)
    const tilingSprite = new PIXI.TilingSprite(bgTexture, app.screen.width, app.screen.height)
    bgLayer.addChild(tilingSprite)

    const brushPreview = new PIXI.Graphics()
    overlayLayer.addChild(brushPreview)

    const selectionPreview = new PIXI.Graphics()
    overlayLayer.addChild(selectionPreview)

    const selectionOutline = new PIXI.Graphics()
    overlayLayer.addChild(selectionOutline)

    resourcesRef.current.brushGraphics = new PIXI.Graphics()
    resourcesRef.current.layers = {
      bgLayer,
      contentLayer,
      overlayLayer,
      interactionLayer,
      brushPreview,
      selectionPreview,
      selectionOutline,
      tilingSprite,
    }

    const resize = () => {
      if (!containerRef.current) return
      app.renderer.resize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      tilingSprite.width = app.screen.width
      tilingSprite.height = app.screen.height
      interactionLayer.hitArea = app.screen
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      app.destroy(true, { children: true, texture: true, baseTexture: true })
      // 清理引用，防止在组件卸载后访问已销毁的对象导致 "Cannot read properties of null" 错误
      appRef.current = null
      resourcesRef.current.layers = null
    }
  }, [])

  useEffect(() => {
    const app = appRef.current
    if (!app || !image) return

    const res = resourcesRef.current
    if (!res.layers) return

    if (res.imageContainer) {
      // 在销毁 imageContainer 之前，先将复用的图层移除，防止它们被连带销毁
      if (res.layers.brushPreview) res.imageContainer.removeChild(res.layers.brushPreview)
      if (res.layers.selectionPreview) res.imageContainer.removeChild(res.layers.selectionPreview)
      if (res.layers.selectionOutline) res.imageContainer.removeChild(res.layers.selectionOutline)
      
      res.layers.contentLayer.removeChild(res.imageContainer)
      res.imageContainer.destroy({ children: true })
      res.imageContainer = null
      res.imageSprite = null
      res.maskSprite = null
      if (res.mask?.texture?.baseTexture) res.mask.texture.baseTexture.destroy()
      res.mask = null
      res.originalTexture = null
      res.history.stack = []
      res.history.index = -1
      res.historyApi = null
    }

    const baseTexture = PIXI.BaseTexture.from(image)
    const originalTexture = new PIXI.Texture(baseTexture)

    const maskWidth = image.width
    const maskHeight = image.height
    const rgba = new Uint8Array(maskWidth * maskHeight * 4)
    for (let i = 0; i < rgba.length; i += 4) {
      rgba[i] = 255
      rgba[i + 1] = 255
      rgba[i + 2] = 255
      rgba[i + 3] = 255
    }
    const maskTexture = PIXI.Texture.fromBuffer(rgba, maskWidth, maskHeight)
    const maskSprite = new PIXI.Sprite(maskTexture)
    const imageSprite = PIXI.Sprite.from(originalTexture)

    const padding = 40
    const scale = Math.min((app.screen.width - padding) / image.width, (app.screen.height - padding) / image.height)

    const container = new PIXI.Container()
    container.x = app.screen.width / 2
    container.y = app.screen.height / 2
    res.baseScale = scale
    container.scale.set(scale * (stateRef.current.zoom ?? 1))

    imageSprite.anchor.set(0.5)
    maskSprite.anchor.set(0.5)

    container.addChild(imageSprite)
    container.addChild(maskSprite)

    if (res.layers.brushPreview) {
      res.layers.brushPreview.position.set(-image.width / 2, -image.height / 2)
      container.addChild(res.layers.brushPreview)
    }
    if (res.layers.selectionPreview) {
      res.layers.selectionPreview.position.set(-image.width / 2, -image.height / 2)
      container.addChild(res.layers.selectionPreview)
    }
    if (res.layers.selectionOutline) {
      res.layers.selectionOutline.position.set(-image.width / 2, -image.height / 2)
      container.addChild(res.layers.selectionOutline)
    }

    maskSprite.renderable = false
    imageSprite.mask = maskSprite

    res.layers.contentLayer.addChild(container)

    res.originalTexture = originalTexture
    res.maskSprite = maskSprite
    res.imageSprite = imageSprite
    res.imageContainer = container
    res.mask = { width: maskWidth, height: maskHeight, rgba, texture: maskTexture }

    const history = res.history
    history.stack = []
    history.index = -1

    const notifyHistoryChange = () => {
      const payload = {
        index: history.index,
        length: history.stack.length,
        canUndo: history.index > 0,
        canRedo: history.index >= 0 && history.index < history.stack.length - 1,
      }
      const cb = historyChangeRef.current
      if (typeof cb === 'function') cb(payload)
    }

    const captureMaskSnapshot = () => {
      const m = resourcesRef.current.mask
      if (!m) return null
      const alpha = new Uint8Array(m.width * m.height)
      const src = m.rgba
      for (let i = 0, j = 3; i < alpha.length; i += 1, j += 4) alpha[i] = src[j]
      return { width: m.width, height: m.height, alpha }
    }

    const applyMaskSnapshot = (snap) => {
      const m = resourcesRef.current.mask
      if (!m || !snap) return false
      if (snap.width !== m.width || snap.height !== m.height) return false
      const dst = m.rgba
      const alpha = snap.alpha
      for (let i = 0, j = 3; i < alpha.length; i += 1, j += 4) dst[j] = alpha[i]
      m.texture.baseTexture.update()
      return true
    }

    const pushHistory = () => {
      const snap = captureMaskSnapshot()
      if (!snap) return false
      if (history.index < history.stack.length - 1) history.stack.splice(history.index + 1)
      history.stack.push(snap)
      history.index = history.stack.length - 1
      const overflow = history.stack.length - history.capacity
      if (overflow > 0) {
        history.stack.splice(0, overflow)
        history.index = Math.max(0, history.index - overflow)
      }
      notifyHistoryChange()
      return true
    }

    const undo = () => {
      if (history.index <= 0) return false
      history.index -= 1
      const ok = applyMaskSnapshot(history.stack[history.index])
      notifyHistoryChange()
      return ok
    }

    const redo = () => {
      if (history.index < 0 || history.index >= history.stack.length - 1) return false
      history.index += 1
      const ok = applyMaskSnapshot(history.stack[history.index])
      notifyHistoryChange()
      return ok
    }

    res.historyApi = { pushHistory, undo, redo, notifyHistoryChange }
    pushHistory()

    window.__alphaEditorDebug = {
      getMaskAlphaSum: () => {
        const m = resourcesRef.current.mask
        if (!m) return null
        const pixels = m.rgba
        let sum = 0
        for (let i = 3; i < pixels.length; i += 4) sum += pixels[i]
        return sum
      },
      resetMask: () => {
        const m = resourcesRef.current.mask
        if (!m) return false
        const pixels = m.rgba
        for (let i = 3; i < pixels.length; i += 4) pixels[i] = 255
        m.texture.baseTexture.update()
        const api = resourcesRef.current.historyApi
        if (api?.pushHistory) api.pushHistory()
        return true
      },
      undo: () => resourcesRef.current.historyApi?.undo?.() ?? false,
      redo: () => resourcesRef.current.historyApi?.redo?.() ?? false,
      canUndo: () => resourcesRef.current.history?.index > 0,
      canRedo: () => {
        const h = resourcesRef.current.history
        if (!h) return false
        return h.index >= 0 && h.index < h.stack.length - 1
      },
      getContainerScale: () => {
        const c = resourcesRef.current.imageContainer
        if (!c) return null
        return c.scale?.x ?? null
      },
      getSelectionType: () => interactionRef.current.selection?.type ?? 'none',
      clearSelection: () => {
        interactionRef.current.selection = { type: 'none' }
        if (resourcesRef.current.layers?.selectionOutline) resourcesRef.current.layers.selectionOutline.clear()
        if (resourcesRef.current.layers?.selectionPreview) resourcesRef.current.layers.selectionPreview.clear()
      },
      exportPNG: () => {
        const m = resourcesRef.current.mask
        if (!m || !image) return null
        const w = m.width
        const h = m.height
        const src = m.rgba
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx2 = canvas.getContext('2d')
        if (!ctx2) return null

        const srcCanvas = document.createElement('canvas')
        srcCanvas.width = w
        srcCanvas.height = h
        const sctx = srcCanvas.getContext('2d')
        if (!sctx) return null

        sctx.drawImage(image, 0, 0, w, h)
        const dstData = sctx.getImageData(0, 0, w, h)
        const dst = dstData.data
        let alphaSum = 0
        for (let p = 0; p < w * h; p += 1) {
          const mi = p * 4 + 3
          const maskA = src[mi]
          const si = p * 4 + 3
          const srcA = dst[si]
          const outA = maskA === 255 ? srcA : Math.round(srcA * (maskA / 255))
          dst[si] = outA
          alphaSum += outA
        }
        window.__alphaEditorDebug.lastExportAlphaSum = alphaSum
        ctx2.putImageData(dstData, 0, 0)
        return canvas.toDataURL('image/png')
      },
    }
  }, [image])

  useEffect(() => {
    const app = appRef.current
    const res = resourcesRef.current
    if (!app || !res.layers) return

    const getPointerTexturePos = (globalPoint) => {
      if (!res.imageSprite || !image) return null
      const localPos = res.imageSprite.toLocal(globalPoint)
      const x = localPos.x + image.width / 2
      const y = localPos.y + image.height / 2
      if (x < 0 || y < 0 || x > image.width || y > image.height) return null
      return { x, y }
    }

    const isInsideSelection = (x, y) => {
      const sel = interactionRef.current.selection
      if (!sel || sel.type === 'none') return true
      if (sel.type === 'rect') return x >= sel.x && x <= sel.x + sel.w && y >= sel.y && y <= sel.y + sel.h
      if (sel.type === 'circle') {
        const dx = x - sel.cx
        const dy = y - sel.cy
        return dx * dx + dy * dy <= sel.r * sel.r
      }
      if (sel.type === 'lasso') {
        const pts = sel.points
        if (!pts || pts.length < 3) return true
        let inside = false
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i += 1) {
          const xi = pts[i].x
          const yi = pts[i].y
          const xj = pts[j].x
          const yj = pts[j].y
          const intersect = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-6) + xi
          if (intersect) inside = !inside
        }
        return inside
      }
      return true
    }

    const drawAt = (x, y) => {
      const m = res.mask
      if (!m) return
      if (!isInsideSelection(x, y)) return
      const s = stateRef.current
      const tool = s.activeTool
      const target = Math.round(Math.max(0, Math.min(1, s.opacity ?? 0)) * 255)
      const radius = Math.max(5, (s.brushSize ?? 50) / 2)
      const isSquare = s.brushShape === 'square'
      const buf = m.rgba
      const w = m.width
      const h = m.height
      const cx = Math.round(x)
      const cy = Math.round(y)
      const r2 = radius * radius

      const x0 = Math.max(0, Math.floor(cx - radius))
      const x1 = Math.min(w - 1, Math.ceil(cx + radius))
      const y0 = Math.max(0, Math.floor(cy - radius))
      const y1 = Math.min(h - 1, Math.ceil(cy + radius))

      let changed = false
      for (let yy = y0; yy <= y1; yy += 1) {
        const dy = yy - cy
        for (let xx = x0; xx <= x1; xx += 1) {
          const dx = xx - cx
          if (isSquare) {
            if (Math.abs(dx) > radius || Math.abs(dy) > radius) continue
          } else if (dx * dx + dy * dy > r2) continue
          if (!isInsideSelection(xx, yy)) continue
          const idx = (yy * w + xx) * 4 + 3
          const cur = buf[idx]
          let next = cur
          if (tool === 'brush') next = Math.min(cur, target)
          else if (tool === 'eraser') next = 255
          else return
          if (next === cur) continue
          buf[idx] = next
          changed = true
        }
      }

      if (!changed) return
      interactionRef.current.strokeDirty = true
      m.texture.baseTexture.update()
    }

    const renderSelectionOutline = () => {
      const outline = res.layers.selectionOutline
      outline.clear()
      const sel = interactionRef.current.selection
      if (!sel || sel.type === 'none') return
      outline.lineStyle(1, 0x00e5ff, 0.9)
      if (sel.type === 'rect') {
        outline.drawRect(sel.x, sel.y, sel.w, sel.h)
        return
      }
      if (sel.type === 'circle') {
        outline.drawCircle(sel.cx, sel.cy, sel.r)
        return
      }
      if (sel.type === 'lasso' && sel.points?.length >= 2) {
        outline.moveTo(sel.points[0].x, sel.points[0].y)
        for (let i = 1; i < sel.points.length; i += 1) outline.lineTo(sel.points[i].x, sel.points[i].y)
        outline.lineTo(sel.points[0].x, sel.points[0].y)
      }
    }

    const applyOpacityToSelection = (sel) => {
      const m = res.mask
      if (!m || !sel || sel.type === 'none') return false
      const target = Math.round(Math.max(0, Math.min(1, stateRef.current.opacity ?? 0)) * 255)
      const buf = m.rgba
      const w = m.width
      const h = m.height

      const pointInLasso = (x, y, pts) => {
        if (!pts || pts.length < 3) return false
        let inside = false
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i += 1) {
          const xi = pts[i].x
          const yi = pts[i].y
          const xj = pts[j].x
          const yj = pts[j].y
          const intersect = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-6) + xi
          if (intersect) inside = !inside
        }
        return inside
      }

      let x0 = 0
      let y0 = 0
      let x1 = w - 1
      let y1 = h - 1
      if (sel.type === 'rect') {
        x0 = Math.max(0, Math.floor(sel.x))
        y0 = Math.max(0, Math.floor(sel.y))
        x1 = Math.min(w - 1, Math.ceil(sel.x + sel.w))
        y1 = Math.min(h - 1, Math.ceil(sel.y + sel.h))
      } else if (sel.type === 'circle') {
        x0 = Math.max(0, Math.floor(sel.cx - sel.r))
        y0 = Math.max(0, Math.floor(sel.cy - sel.r))
        x1 = Math.min(w - 1, Math.ceil(sel.cx + sel.r))
        y1 = Math.min(h - 1, Math.ceil(sel.cy + sel.r))
      } else if (sel.type === 'lasso') {
        const pts = sel.points
        if (!pts || pts.length < 3) return false
        let minX = pts[0].x
        let minY = pts[0].y
        let maxX = pts[0].x
        let maxY = pts[0].y
        for (let i = 1; i < pts.length; i += 1) {
          const p = pts[i]
          if (p.x < minX) minX = p.x
          if (p.y < minY) minY = p.y
          if (p.x > maxX) maxX = p.x
          if (p.y > maxY) maxY = p.y
        }
        x0 = Math.max(0, Math.floor(minX))
        y0 = Math.max(0, Math.floor(minY))
        x1 = Math.min(w - 1, Math.ceil(maxX))
        y1 = Math.min(h - 1, Math.ceil(maxY))
      }

      let changed = false
      for (let yy = y0; yy <= y1; yy += 1) {
        for (let xx = x0; xx <= x1; xx += 1) {
          let inside = true
          if (sel.type === 'rect') inside = xx >= sel.x && xx <= sel.x + sel.w && yy >= sel.y && yy <= sel.y + sel.h
          else if (sel.type === 'circle') {
            const dx = xx - sel.cx
            const dy = yy - sel.cy
            inside = dx * dx + dy * dy <= sel.r * sel.r
          } else if (sel.type === 'lasso') inside = pointInLasso(xx, yy, sel.points)
          if (!inside) continue
          const idx = (yy * w + xx) * 4 + 3
          if (buf[idx] === target) continue
          buf[idx] = target
          changed = true
        }
      }

      if (!changed) return false
      m.texture.baseTexture.update()
      return true
    }

    const updateBrushPreview = (e) => {
      const preview = res.layers.brushPreview
      preview.clear()
      const s = stateRef.current
      const tool = s.activeTool
      if (tool !== 'brush' && tool !== 'eraser') return
      const pos = getPointerTexturePos(e.data.global)
      if (!pos) return
      preview.lineStyle(1, tool === 'eraser' ? 0xff4d4f : 0x00e5ff, 0.8)
      const r = Math.max(1, (s.brushSize ?? 20) / 2)
      if (s.brushShape === 'square') preview.drawRect(pos.x - r, pos.y - r, r * 2, r * 2)
      else preview.drawCircle(pos.x, pos.y, r)
    }

    const onPointerDown = (e) => {
      const tool = stateRef.current.activeTool
      if (!res.imageSprite || !image) return

      if (tool === 'move') {
        if (!res.imageContainer) return
        interactionRef.current.isPanning = true
        interactionRef.current.panPointerStart = { x: e.data.global.x, y: e.data.global.y }
        interactionRef.current.panContainerStart = { x: res.imageContainer.x, y: res.imageContainer.y }
        return
      }

      const pos = getPointerTexturePos(e.data.global)
      if (!pos) return

      if (tool === 'brush' || tool === 'eraser') {
        interactionRef.current.isDrawing = true
        interactionRef.current.strokeDirty = false
        drawAt(pos.x, pos.y)
        return
      }

      if (tool === 'rect-select') {
        interactionRef.current.selectionDraft = { type: 'rect', startX: pos.x, startY: pos.y }
        return
      }

      if (tool === 'circle-select') {
        interactionRef.current.selectionDraft = { type: 'circle', startX: pos.x, startY: pos.y }
        return
      }

      if (tool === 'lasso-select') {
        interactionRef.current.lassoPoints = [{ x: pos.x, y: pos.y }]
        interactionRef.current.selectionDraft = { type: 'lasso' }
      }
    }

    const onPointerMove = (e) => {
      updateBrushPreview(e)
      if (!res.imageSprite || !image) return

      if (interactionRef.current.isPanning) {
        if (!res.imageContainer || !interactionRef.current.panPointerStart || !interactionRef.current.panContainerStart)
          return
        const dx = e.data.global.x - interactionRef.current.panPointerStart.x
        const dy = e.data.global.y - interactionRef.current.panPointerStart.y
        res.imageContainer.x = interactionRef.current.panContainerStart.x + dx
        res.imageContainer.y = interactionRef.current.panContainerStart.y + dy
        return
      }

      const pos = getPointerTexturePos(e.data.global)
      if (!pos) return

      if (interactionRef.current.isDrawing) {
        drawAt(pos.x, pos.y)
        return
      }

      const draft = interactionRef.current.selectionDraft
      if (!draft) return

      const preview = res.layers.selectionPreview
      preview.clear()
      preview.lineStyle(1, 0xffffff, 0.6)
      if (draft.type === 'rect') {
        const x = Math.min(draft.startX, pos.x)
        const y = Math.min(draft.startY, pos.y)
        const w = Math.abs(pos.x - draft.startX)
        const h = Math.abs(pos.y - draft.startY)
        preview.drawRect(x, y, w, h)
        return
      }

      if (draft.type === 'circle') {
        const cx = draft.startX
        const cy = draft.startY
        const dx = pos.x - cx
        const dy = pos.y - cy
        const r = Math.sqrt(dx * dx + dy * dy)
        preview.drawCircle(cx, cy, r)
        return
      }

      if (draft.type === 'lasso') {
        const pts = interactionRef.current.lassoPoints
        const last = pts[pts.length - 1]
        const ddx = pos.x - last.x
        const ddy = pos.y - last.y
        if (ddx * ddx + ddy * ddy >= 16) pts.push({ x: pos.x, y: pos.y })
        preview.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i += 1) preview.lineTo(pts[i].x, pts[i].y)
      }
    }

    const onPointerUp = (e) => {
      const wasDrawing = interactionRef.current.isDrawing
      const strokeDirty = interactionRef.current.strokeDirty
      interactionRef.current.isDrawing = false
      interactionRef.current.isPanning = false
      interactionRef.current.panPointerStart = null
      interactionRef.current.panContainerStart = null

      if (wasDrawing && strokeDirty) {
        const api = res.historyApi
        if (api?.pushHistory) api.pushHistory()
      }

      const res2 = resourcesRef.current
      if (!res2.layers) return
      const draft = interactionRef.current.selectionDraft
      if (!draft) return

      const pos = getPointerTexturePos(e.data.global)
      if (!pos) {
        interactionRef.current.selectionDraft = null
        res2.layers.selectionPreview.clear()
        return
      }

      if (draft.type === 'rect') {
        const x = Math.min(draft.startX, pos.x)
        const y = Math.min(draft.startY, pos.y)
        const w = Math.abs(pos.x - draft.startX)
        const h = Math.abs(pos.y - draft.startY)
        const sel = w < 2 || h < 2 ? { type: 'none' } : { type: 'rect', x, y, w, h }
        if (sel.type !== 'none' && applyOpacityToSelection(sel)) res.historyApi?.pushHistory?.()
        interactionRef.current.selection = { type: 'none' }
        res2.layers.selectionOutline.clear()
      }

      if (draft.type === 'circle') {
        const cx = draft.startX
        const cy = draft.startY
        const dx = pos.x - cx
        const dy = pos.y - cy
        const r = Math.sqrt(dx * dx + dy * dy)
        const sel = r < 2 ? { type: 'none' } : { type: 'circle', cx, cy, r }
        if (sel.type !== 'none' && applyOpacityToSelection(sel)) res.historyApi?.pushHistory?.()
        interactionRef.current.selection = { type: 'none' }
        res2.layers.selectionOutline.clear()
      }

      if (draft.type === 'lasso') {
        const pts = interactionRef.current.lassoPoints
        const sel = pts.length < 3 ? { type: 'none' } : { type: 'lasso', points: pts.slice() }
        if (sel.type !== 'none' && applyOpacityToSelection(sel)) res.historyApi?.pushHistory?.()
        interactionRef.current.selection = { type: 'none' }
        res2.layers.selectionOutline.clear()
        interactionRef.current.lassoPoints = []
      }

      interactionRef.current.selectionDraft = null
      res2.layers.selectionPreview.clear()
      renderSelectionOutline()
    }

    const layer = res.layers.interactionLayer
    layer.on('pointerdown', onPointerDown)
    layer.on('pointermove', onPointerMove)
    layer.on('pointerup', onPointerUp)
    layer.on('pointerupoutside', onPointerUp)

    return () => {
      layer.off('pointerdown', onPointerDown)
      layer.off('pointermove', onPointerMove)
      layer.off('pointerup', onPointerUp)
      layer.off('pointerupoutside', onPointerUp)
    }
  }, [image])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onWheel = (e) => {
      e.preventDefault()
      const delta = -e.deltaY
      let action = wheelAction

      // 允许通过按住 Alt 键临时切换到另一种模式
      if (e.altKey) {
        action = action === 'zoom' ? 'brush' : 'zoom'
      }
      // Ctrl + 滚轮通常是缩放
      if (e.ctrlKey) {
        action = 'zoom'
      }

      if (action === 'zoom') {
        const step = 0.05
        const currentZoom = state.zoom ?? 1
        const zoomFactor = delta > 0 ? 1.1 : 0.9
        const newZoom = Math.max(0.25, Math.min(4, currentZoom * zoomFactor))

        // 定点缩放逻辑
        const res = resourcesRef.current // 获取当前引用
        if (res && res.imageContainer && res.imageSprite) {
          // 获取鼠标在 Container 父级（contentLayer）坐标系下的位置
          // contentLayer 也是全屏的，所以 global 位置近似等于 local 位置
          const globalPos = { x: e.data?.global?.x ?? e.clientX, y: e.data?.global?.y ?? e.clientY }
          // 注意：e.data 是 PIXI 事件，但 wheel 是原生事件，所以这里 e 是原生 WheelEvent
          // 原生事件没有 data.global，需要用 clientX/clientY 并且要考虑 canvas 的 offset
          // 但这里 container 是全屏的，所以 clientX/Y 大致可用，但更准确的是获取 boundingClientRect
          
          // 获取 canvas 相对窗口的位置
          const rect = container.getBoundingClientRect()
          const mouseX = e.clientX - rect.left
          const mouseY = e.clientY - rect.top
          
          // 我们需要 contentLayer 的引用来做 toLocal，但 contentLayer 在 res.layers 里
          // 实际上 contentLayer 也是全屏且未偏移，所以 (mouseX, mouseY) 就是 contentLayer 下的坐标
          
          // Container 当前位置
          const cx = res.imageContainer.x
          const cy = res.imageContainer.y
          
          // 鼠标相对于 Container 中心的偏移量
          const dx = mouseX - cx
          const dy = mouseY - cy

          // 新的 scale
          const nextScale = (res.baseScale || 1) * newZoom
          const currentScale = res.imageContainer.scale.x

          // 计算新的位置
          const scaleRatio = nextScale / currentScale
          const newCx = mouseX - dx * scaleRatio
          const newCy = mouseY - dy * scaleRatio

          res.imageContainer.x = newCx
          res.imageContainer.y = newCy
        }

        if (onZoomChange) onZoomChange(newZoom)
      } else if (action === 'brush') {
        const step = 10
        const currentSize = state.brushSize ?? 50
        const newSize = Math.max(10, Math.min(500, currentSize + (delta > 0 ? step : -step)))
        if (onBrushSizeChange) onBrushSizeChange(newSize)
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [state.zoom, state.brushSize, wheelAction, onZoomChange, onBrushSizeChange])

  useEffect(() => {
    const res = resourcesRef.current
    if (!res.imageContainer) return
    const zoom = Math.max(0.25, Math.min(4, state.zoom ?? 1))
    const nextScale = (res.baseScale || 1) * zoom
    res.imageContainer.scale.set(nextScale)
  }, [state.zoom, image])

  return <div ref={containerRef} className="w-full h-full" />
}

export default function App() {
  const [editorState, setEditorState] = useState({
    activeTool: 'brush',
    brushSize: 50,
    brushShape: 'circle',
    opacity: 0,
    zoom: 1,
    historyIndex: -1,
    historyLength: 0,
    canUndo: false,
    canRedo: false,
  })

  const [panels, setPanels] = useState({
    left: true,
    right: true,
  })

  const [shortcuts, setShortcuts] = useState(() => {
    const isMac = typeof navigator !== 'undefined' && navigator.platform?.toLowerCase().includes('mac')
    const mod = isMac ? 'Meta' : 'Control'
    return {
      toolMove: { keys: ['v'], label: '工具：移动' },
      toolBrush: { keys: ['b'], label: '工具：画笔' },
      toolEraser: { keys: ['e'], label: '工具：橡皮擦' },
      toolRect: { keys: ['m'], label: '工具：矩形选区' },
      toolCircle: { keys: ['c'], label: '工具：圆形选区' },
      toolLasso: { keys: ['l'], label: '工具：套索' },
      increaseBrushSize: { keys: [mod, 't', '='], label: '增大画笔' },
      decreaseBrushSize: { keys: [mod, 't', '-'], label: '减小画笔' },
      toggleBrushShape: { keys: ['x'], label: '切换画笔形状' },
      increaseOpacity: { keys: [']'], label: '增加不透明度' },
      decreaseOpacity: { keys: ['['], label: '减少不透明度' },
      zoomIn: { keys: [mod, '='], label: '放大画布' },
      zoomOut: { keys: [mod, '-'], label: '缩小画布' },
      undo: { keys: [mod, 'z'], label: '撤销' },
    }
  })
  
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [wheelAction, setWheelAction] = useState('zoom') // 'zoom' or 'brush'

  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState('')

  const handleImageUpload = (file) => {
    // 保存原始文件名（去除扩展名）
    const name = file.name.replace(/\.[^/.]+$/, "")
    setImageName(name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => setImage(img)
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    if (!file || !file.type.startsWith('image/')) return
    handleImageUpload(file)
  }

  const handleHistoryChange = (payload) => {
    if (!payload) return
    setEditorState((prev) => ({
      ...prev,
      historyIndex: payload.index ?? prev.historyIndex,
      historyLength: payload.length ?? prev.historyLength,
      canUndo: !!payload.canUndo,
      canRedo: !!payload.canRedo,
    }))
  }

  const handleUndo = () => {
    window.__alphaEditorDebug?.undo?.()
  }

  const handleReset = () => {
    window.__alphaEditorDebug?.resetMask?.()
  }

  const handleDownload = () => {
    if (!image) return
    setShowDownloadDialog(true)
  }

  const handleConfirmDownload = (fileName) => {
    setShowDownloadDialog(false)
    const dataUrl = window.__alphaEditorDebug?.exportPNG?.()
    if (!dataUrl) return

    const defaultName = imageName || `alpha-editor-${Date.now()}`
    const finalName = fileName || defaultName

    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${finalName}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const handleRedo = () => {
    window.__alphaEditorDebug?.redo?.()
  }

  // 快捷键处理逻辑
  const pressedKeys = useRef(new Set())

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 忽略输入框中的按键
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      
      const key = e.key === ' ' ? 'Space' : e.key
      pressedKeys.current.add(key)
      
      const checkShortcut = (config) => {
        if (!config || !config.keys) return false
        return config.keys.every(k => pressedKeys.current.has(k))
      }

      let matched = false
      if (checkShortcut(shortcuts.toolMove)) {
        setEditorState(prev => ({ ...prev, activeTool: 'move' }))
        matched = true
      } else if (checkShortcut(shortcuts.toolBrush)) {
        setEditorState(prev => ({ ...prev, activeTool: 'brush' }))
        matched = true
      } else if (checkShortcut(shortcuts.toolEraser)) {
        setEditorState(prev => ({ ...prev, activeTool: 'eraser' }))
        matched = true
      } else if (checkShortcut(shortcuts.toolRect)) {
        setEditorState(prev => ({ ...prev, activeTool: 'rect-select' }))
        matched = true
      } else if (checkShortcut(shortcuts.toolCircle)) {
        setEditorState(prev => ({ ...prev, activeTool: 'circle-select' }))
        matched = true
      } else if (checkShortcut(shortcuts.toolLasso)) {
        setEditorState(prev => ({ ...prev, activeTool: 'lasso-select' }))
        matched = true
      } else if (checkShortcut(shortcuts.increaseBrushSize)) {
        setEditorState(prev => ({ ...prev, brushSize: Math.min(500, prev.brushSize + 10) }))
        matched = true
      } else if (checkShortcut(shortcuts.decreaseBrushSize)) {
        setEditorState(prev => ({ ...prev, brushSize: Math.max(10, prev.brushSize - 10) }))
        matched = true
      } else if (checkShortcut(shortcuts.toggleBrushShape)) {
        setEditorState(prev => ({ ...prev, brushShape: prev.brushShape === 'circle' ? 'square' : 'circle' }))
        matched = true
      } else if (checkShortcut(shortcuts.increaseOpacity)) {
        setEditorState(prev => ({ ...prev, opacity: Math.min(1, prev.opacity + 0.05) }))
        matched = true
      } else if (checkShortcut(shortcuts.decreaseOpacity)) {
        setEditorState(prev => ({ ...prev, opacity: Math.max(0, prev.opacity - 0.05) }))
        matched = true
      } else if (checkShortcut(shortcuts.zoomIn)) {
        setEditorState(prev => ({ ...prev, zoom: Math.min(4, (prev.zoom ?? 1) * 1.1) }))
        matched = true
      } else if (checkShortcut(shortcuts.zoomOut)) {
        setEditorState(prev => ({ ...prev, zoom: Math.max(0.25, (prev.zoom ?? 1) * 0.9) }))
        matched = true
      } else if (checkShortcut(shortcuts.undo)) {
        window.__alphaEditorDebug?.undo?.()
        matched = true
      }
      
      if (matched) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    const handleKeyUp = (e) => {
      const key = e.key === ' ' ? 'Space' : e.key
      pressedKeys.current.delete(key)
    }
    
    const handleBlur = () => {
        pressedKeys.current.clear()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [shortcuts])

  return (
    <div
      className="flex flex-col h-screen w-screen bg-background text-foreground relative overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Header
        onUpload={handleImageUpload}
        onDownload={handleDownload}
        onUndo={handleUndo}
        onReset={handleReset}
        onRedo={handleRedo}
        onOpenSettings={() => setShowShortcuts(true)}
        canUndo={editorState.canUndo}
        canDownload={!!image}
        canReset={!!image}
        canRedo={editorState.canRedo}
      />
      <main className="flex-1 relative bg-grid">
        {image ? (
          <Canvas
            image={image}
            state={editorState}
            onHistoryChange={handleHistoryChange}
            onZoomChange={(val) => setEditorState((prev) => ({ ...prev, zoom: val }))}
            onBrushSizeChange={(val) => setEditorState((prev) => ({ ...prev, brushSize: val }))}
            wheelAction={wheelAction}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-accent-foreground/50 pointer-events-none">
            <div className="text-center">
              <p className="text-2xl mb-2">等待图片导入</p>
              <p className="text-sm">拖入图片开始编辑</p>
            </div>
          </div>
        )}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50">
          <Toolbar
            activeTool={editorState.activeTool}
            onToolChange={(tool) => setEditorState((prev) => ({ ...prev, activeTool: tool }))}
            isOpen={panels.left}
            onToggle={() => setPanels((prev) => ({ ...prev, left: !prev.left }))}
          />
        </div>
        <div className="absolute right-6 top-6 bottom-6 pointer-events-none z-50 flex flex-col justify-center">
          <PropertiesPanel
            state={editorState}
            onChange={(key, val) => setEditorState((prev) => ({ ...prev, [key]: val }))}
            isOpen={panels.right}
            onToggle={() => setPanels((prev) => ({ ...prev, right: !prev.right }))}
          />
        </div>
      </main>
      {showShortcuts && (
        <ShortcutsPanel
          shortcuts={shortcuts}
          onUpdate={(id, keys) => setShortcuts((prev) => ({ ...prev, [id]: { ...prev[id], keys } }))}
          onClose={() => setShowShortcuts(false)}
        />
      )}
      <DownloadDialog
        isOpen={showDownloadDialog}
        onClose={() => setShowDownloadDialog(false)}
        onConfirm={handleConfirmDownload}
        defaultName={imageName || `alpha-editor-${Date.now()}`}
      />
    </div>
  )
}

