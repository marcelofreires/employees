import { ReactNode } from 'react'
import { Box, Container, IconButton, Modal, Theme } from '@mui/material'
import Close from '@mui/icons-material/Close'

interface ModalFormProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export function ModalForm({ children, isOpen, onClose }: ModalFormProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 600
        }}
      >
        <Container>
          <Box
            sx={(theme: Theme) => ({
              bgcolor: theme.palette.background.default,
              borderColor: theme.palette.divider,
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 2,
              p: 4,
              position: 'relative'
            })}
          >
            <Box
              sx={{
                position: 'absolute',
                right: 8,
                top: 8
              }}
            >
              <IconButton aria-label="close" title="Fechar" onClick={onClose}>
                <Close />
              </IconButton>
            </Box>
            {children}
          </Box>
        </Container>
      </Box>
    </Modal>
  )
}
