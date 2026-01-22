import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

const XIcon = () => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

export const ShortcutsPanel = ({ shortcuts, onUpdate, onClose }) => {
  const [editingId, setEditingId] = useState(null)
  const [recordedKeys, setRecordedKeys] = useState([])

  useEffect(() => {
    if (!editingId) return

    const handleKeyDown = (e) => {
      e.preventDefault()
      e.stopPropagation()
      
      const key = e.key === ' ' ? 'Space' : e.key
      // 忽略单独的修饰键按下，但如果组合键中包含它们则记录
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(key)) {
         // 我们需要修饰键作为组合的一部分，所以也记录，但要去重
      }
      
      setRecordedKeys((prev) => {
        if (prev.includes(key)) return prev
        return [...prev, key]
      })
    }

    const handleKeyUp = (e) => {
      // 在松开按键时，如果已经记录了按键组合，则保存并退出编辑模式
      // 这里简化处理：只要有按键抬起，且录制了非修饰键，或者录制了多个键，就认为录制完成
      // 但为了支持 Ctrl+T+Plus，我们需要一种确认机制。
      // 通常是：按下所有键，然后全部松开。或者按下回车确认。
      // 为了用户体验，我们采用：当所有按键松开时，保存结果。
    }
    
    // 更好的方式：检测当前按下的所有键
    // 但是 React合成事件可能不准。
    // 我们采用：用户按下想要的组合，然后点击“保存”或者再次点击录制框？
    // 不，通常是：点击录制 -> 按下组合 -> (检测到组合释放或超时) -> 保存。
    // 让我们用一个简单的逻辑：按下 Enter 完成录制，或者点击外部。
    // 或者：实时显示按下的键，当用户停止按键超过一定时间（如 1s）自动保存？
    // 让我们用：按下 Escape 取消，按下 Enter 保存。
    // 但是 Enter 可能是快捷键的一部分。
    
    window.addEventListener('keydown', handleKeyDown)
    // window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // window.removeEventListener('keyup', handleKeyUp)
    }
  }, [editingId])

  const saveShortcut = () => {
    if (editingId && recordedKeys.length > 0) {
      onUpdate(editingId, recordedKeys)
      setEditingId(null)
      setRecordedKeys([])
    }
  }

  const cancelEditing = () => {
    setEditingId(null)
    setRecordedKeys([])
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur z-[100] flex items-center justify-center">
      <div className="bg-background border border-accent rounded-lg shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <XIcon />
        </button>
        
        <h2 className="text-xl font-bold mb-6">快捷键设置</h2>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {Object.entries(shortcuts).map(([id, config]) => (
            <div key={id} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
              <span className="text-sm font-medium">{config.label}</span>
              
              <div className="flex items-center gap-2">
                {editingId === id ? (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 text-primary px-2 py-1 rounded text-xs border border-primary/30 min-w-[60px] text-center">
                      {recordedKeys.length > 0 ? recordedKeys.join(' + ') : '请按键...'}
                    </div>
                    <button
                      onClick={saveShortcut}
                      className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                    >
                      保存
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-muted/80"
                    >
                      取消
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(id)
                      setRecordedKeys([])
                    }}
                    className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs border border-accent hover:border-primary/50 transition-colors min-w-[60px]"
                  >
                    {config.keys.join(' + ')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          <p>提示：点击快捷键按钮开始录制，按下组合键后点击保存。</p>
          <p>鼠标滚轮控制：可在主界面直接使用滚轮调节画笔大小（需开启）。</p>
        </div>
      </div>
    </div>
  )
}
