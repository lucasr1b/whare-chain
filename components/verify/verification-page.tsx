"use client"

import type React from "react"

import { Lock, Shield, FileText, Upload, X, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { UserRole } from "@/contexts/user-context"

interface VerificationPageProps {
  setUserRole: (role: UserRole) => void
}

export default function VerificationPage({ setUserRole }: VerificationPageProps) {
  const [isVerified, setIsVerified] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRealMeSubmitting, setIsRealMeSubmitting] = useState(false)

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleVerify = () => {
    setIsSubmitting(true)

    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false)
      setIsVerified(true)
    }, 2000)
  }

  const handleRealMeVerify = () => {
    setIsRealMeSubmitting(true)

    // Simulate RealMe verification process
    setTimeout(() => {
      setIsRealMeSubmitting(false)
      setIsVerified(true)
    }, 1500)
  }

  // Get file icon based on type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    if (extension === "pdf") {
      return <FileText className="h-4 w-4 text-red-400" />
    } else if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
      return <FileText className="h-4 w-4 text-blue-400" />
    } else {
      return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-xl w-full bg-[#0f0f13] rounded-xl border border-[#2a2a3a] shadow-xl overflow-hidden">
        {isVerified ? (
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-[#8b5cf6]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Verification Complete</h1>
            <p className="text-[#a1a1aa] text-center mb-8">
              Your identity has been verified successfully. You can now access your waitlist status.
            </p>
            <Button
              className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium px-6 py-2 rounded-lg transition-all duration-300"
              onClick={() => setUserRole("waitlisted")}
            >
              Continue to Waitlist
            </Button>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mb-6">
                <Lock className="h-10 w-10 text-[#8b5cf6]" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-3">Verify Identity</h1>
              <p className="text-[#a1a1aa] text-center">
                You need to verify your identity before you can view your waitlist status.
              </p>
            </div>

            {/* RealMe Verification Button */}
            <div className="mb-6">
              <div className="bg-[#1a1a24] rounded-lg p-4 border border-[#2a2a3a] mb-4 hover:border-[#8b5cf6]/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mr-3">
                      <Shield className="h-5 w-5 text-[#8b5cf6]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm mb-0.5">Verify with RealMe</h3>
                      <p className="text-xs text-[#a1a1aa]">Quick and secure verification</p>
                    </div>
                  </div>
                  <Button
                    className={cn(
                      "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium rounded-lg transition-all duration-300",
                      isRealMeSubmitting && "pointer-events-none",
                    )}
                    size="sm"
                    disabled={isRealMeSubmitting}
                    onClick={handleRealMeVerify}
                  >
                    {isRealMeSubmitting ? (
                      <div className="flex items-center px-3 py-0.5">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                        <span className="text-xs">Connecting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center px-3 py-0.5">
                        <span className="text-xs">Verify Now</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center my-4">
                <div className="h-px bg-[#2a2a3a] w-full"></div>
                <span className="px-3 text-xs text-[#71717a]">OR</span>
                <div className="h-px bg-[#2a2a3a] w-full"></div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white text-sm mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-[#8b5cf6]" />
                  Upload Verification Documents
                </h3>

                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-300 relative overflow-hidden",
                    isDragging
                      ? "border-[#8b5cf6] bg-[#8b5cf6]/10"
                      : "border-[#2a2a3a] hover:border-[#8b5cf6]/50 hover:bg-[#8b5cf6]/5",
                  )}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileInput} />
                  <div className="flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="h-5 w-5 text-[#8b5cf6]" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-[#e4e4e7] transition-colors">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-[#a1a1aa]">Supported formats: PDF, JPG, PNG</p>
                    </div>
                  </div>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-[#e4e4e7]">Uploaded documents</p>
                    <p className="text-xs text-[#a1a1aa]">{uploadedFiles.length} file(s)</p>
                  </div>
                  <div className="space-y-1.5 max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-[#1a1a24] p-2 rounded-md border border-[#2a2a3a] group hover:bg-[#1f1f2a] transition-colors"
                      >
                        <div className="flex items-center space-x-2 truncate max-w-[80%]">
                          {getFileIcon(file.name)}
                          <span className="text-xs text-[#e4e4e7] truncate">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-[#a1a1aa] hover:text-white hover:bg-[#2a2a3a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(index)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className={cn(
                  "w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium py-2 rounded-lg transition-all duration-300 text-sm",
                  isSubmitting && "pointer-events-none",
                )}
                disabled={uploadedFiles.length === 0 || isSubmitting}
                onClick={handleVerify}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Submit Documents
                  </>
                )}
              </Button>

              <div className="text-center text-xs text-[#71717a] pt-1">
                <p>Your information is encrypted and securely stored.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

